# Preface:
## This looks way worse than it really is, I'm just doing my best to over explain everything for revisiting purposes and transpancy. Feel free to ping me or Email me if you want further or in-person explanation. 
### aharrison@sourceallies.com
### Alec Harrison

# Problem Statement: 
## In order to continue delivery quality code and reduce human error in manual testing we want to automate high priority manual tests. 

# Solution

## Solution Statement:
### We are using Cypress to automate high priority manual tests in order to reduce human error and provide testing that would be done manually otherwise. While we build the test suit in tandum with the QA identifing manual tests that are prime targets to automate, this also allows us to get integration tests for free. This allows us to run integration tests more often, and be less reliant on our QA everytime we have to run integration tests. This also helps reduce human error in doing itegration testing and frees up our QA to get ahead of developers to write future test cases and manual test.

## High Level what we did and why:

### At a very high level we chose Cypress over a tool like Protactor was due to the ease of use the product over Protractor. The major key feature was the UI for the developers to use, auto retry to cutdown on flakey tests, and similar testing structure to specifcally Jest (a tool we are using for unit testing in our app). 

### We can split up how we broke down Cypress to each of the simplest parts to bring it in gradually instead of just forcing everything to stop. 

#### 1. We got cypress to run locally
- This is given a working local dev enviornment locally just get cypress to run against it (for example running against localhost:4200)
- This doesn't include working with Easy auth or AAD (Azure Active Directory)

#### 2. Setup our AUTO (or E2E) enviornment with EasyAuth turned on.
* This step had a lot of break throughs that are pretty substancial. If you are not using auth you can skip this step.
    * We had to get another enviornment requested and created. Because we are using ARM templates that was pretty painless, however once it was all setup we had to do special AUTO configuration that is unique to our AUTO enviornment.
        * One step back our auth approach is using EasyAuth and AAD with role based auth. Due to the fact we are using EasyAuth that only supports Microsoft adal tokens V1 at the time of this writing we had to do some special things. High level, because we are using V1 tokens managed identities are out the door, they only use version 1 tokens. There are also some strange ways of getting token if you go through github like using pupeteer to get the token for you or other strange tools. This is because Cypress doesn't support going cross domains for UI testing, intentonally.  However, you don't need to do that if you configure your app regestrations correctly.
    * Configuration step can get very in depth I'll break it down into bullet points and am slightly assuming that you know how role based auth works if you don't read this (https://docs.microsoft.com/en-us/azure/role-based-access-control). Our application assigns roles and we are writing Cypress tests from the point of view of a writeAll user (since that is where most of the features are) and are testing as such. There are two parts to the serect sauce of getting this to work.

* First, you need to configure your app registration correctly and that is found at https://portal.azure.com/ at Azure Active Directory => App regestrations => AUTH.IO-(Your app prefix)-AUTO
	Go to the app registration's manifest and put something similar to this 
```
"appRoles": [
		{
			"allowedMemberTypes": [
				"Application",
				"User"
			],
			"description": "This is the role for the admin users",
			"displayName": "WriteAll",
			"id": <Create a custom GUID here>,
			"isEnabled": true,
			"lang": null,
			"origin": "Application",
			"value": "WriteAll"
		}
	],
```
* What this is doing is providing an app level role for you to access your application. One design decision we made intentonally was to only allow Cypress access to our automated enviornment. So I as a user can get past AAD and login, but I don't have permission to do anything in our application. This is done so I can't mess up master config data or mess up other such seeded data between test runs. We also need to go to Expose an API. This is to allow our other app registration to talk to this one. You can use the GUI under Expose an API +Add a scope or do this in the Manifest. Either way when you're done your mainfest should look similar to this 
```
"oauth2Permissions": [
		{
			"adminConsentDescription": <Some Desc>,
			"adminConsentDisplayName": <Some Name>,
			"id": <Custom GUID>,
			"isEnabled": true,
			"lang": null,
			"origin": "Application",
			"type": "User",
			"userConsentDescription": <Some Desc>,
			"userConsentDisplayName": <Some Name>,
			"value": "WriteAll.stuff"
		}
	],
```
* After that we need to go our other app registration. The Corteva standard currently is to have 2 an APP one and an AUTH one. Reach out to someone on cloud team for clarifcation on why, but you should be able to create these yourself. So if you need a second one create that. This one should be something like APP.IO-(Your app prefix)-AUTO. This is the app reg that Cypress will use to authenticate to AAD. Once you have that created and are in that app registration naviagte to API permissions. We can configure this via the GUI or Manifest, but both should produce similar outputs. Hit +Add a permission, then on the modal click on `My APIs`and select your AUTH.IO-(Your app prefix)-AUTO, select application permissions, and click the check for WriteAll. *Notice the Admin Consent Required. You will have to email the cloud engineering team asking them to allow this for your app (I think this is just a button for them and it took less than 2 hours for them to do for us). Now your apps can talk to eachother, but you need to create creds to be able to sign-on. Go to Certificates & secrets and create a new secret for your cypress functions. Corteva standards on passwords is max one year experation (so please don't go higher than that). Next, make sure you save that somewhere safe since once you naviage away you'll never get that pass again. Once you save that you should see the two changes for the API permission and password in you app reg's Manifest.
```
"requiredResourceAccess": [
		{
			"resourceAppId": <GUID>,
			"resourceAccess": [
				{
					"id": <Role's GUID>,
					"type": "Role"
				}
			]
		},
],
```
and password something similar to this
```
"passwordCredentials": [
		{
			"customKeyIdentifier": null,
			"endDate": "2020-10-15T18:49:21.622Z",
			"keyId": <GUID>,
			"startDate": "2019-10-15T18:49:35.186Z",
			"value": null,
			"createdOn": "2019-10-15T18:49:35.3875636Z",
			"hint": "Lxh",
			"displayName": <Name you pick>
		}
	],
```
* Once you have both of those we should now be able to authenticate with Cypress. As of writing this we are using ADAL, however switching to MSAL the Cypress side will be similar. In our commands file we added a shared login() function which is where Cypress gets and sets it's WriteAll token in it's enviornment. It looks something similar to this.
```
declare global {
  namespace Cypress {
    interface Chainable {
      login: () => Chainable
    }
  }
}

export function login() {
  cy.request({
    method: 'POST',
    url: 'https://login.microsoftonline.com/<Directory (tenant) ID>/oauth2/token',
    form: true,
    body: {
      grant_type: 'client_credentials',
      client_id: <APP.IO-(Your app prefix)-AUTO Application (Client) ID>,
      client_secret: <Secret from previous step>,
      resource: <AUTH.IO-(Your app prefix)-AUTO Application (Client) ID>
    }
  }).then(response => {
    const adalToken = response.body.access_token;
    window.localStorage.setItem(
      'adal.access.token.keyede70c9e-7c11-4e3d-a414-b5c10c819f61',
      adalToken
    );

    window.localStorage.setItem('adal.idtoken', adalToken);
  });
}

Cypress.Commands.add('login', login);
```
* Then in any cypress beforeEach() you can call cy.login(); and that will give you a token to allow you to get through EasyAuth and have roles as Cypress. This ends configuration of getting an AUTO token locally to use for testing. 

*Note if you want to have other roles you will need a 1 to 1 additional app regestration for each of your other roles.*


#### 3. We wrote tests against our local enviornment mocking data where it made sense.

#### 4. Where we didn't want to mock data or where it would be better to assert against real data (due to having to make api calls to get the data or for whatever reason) we devised a plan to tackle that
* We decided to create a seeder project to seed data that we would like to assert against. 

#### 5. We ran Cypress in AzureDevOps 
- There are two approaches to this you can have a pre-build step that runs integration steps. That means before any build you can spin up a docker container to run your application and run cypress against it. We decided that the downside to that
  was we weren't using containers and it could delay builds for PR's that are wip or influx.
- The second approach and the one we went with was running it as an Azure WebJob task. 
-- The first step of this was Zipping up our GUI project and publishing it as a Zip. That pretty much concludes the work we did on build side. Next, we had run the tests on the deployment webJob. We created another agent job that is running
	on an Ubutu client. That was done as a suggestion in an online tutorial. This may work on a windows VM, too but we didn't test that. Next we needed to create our tasks. We start by using Extract files task to extract our zipped files,
	npm task to do an npm install, bash task to run npx cypress run, and finally a reporting task. For further help see this link (https://mariocardinal.wordpress.com/2019/03/05/configuring-cypress-in-ci-with-azure-devops-pipelines).
	*Notice we are moving more files over due to using TS and not plain JS. 

#### 6. TODO Figure out how we want to replace our localHost URL with our enviornment URL.