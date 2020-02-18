# Cybernetics Entomology: There's Always One More Bug

## Abstract
We can agree that testing is important for software development, but how and what we test is not so straight forward or agreed upon. Extending beyond unit, integration, and acceptance or end-to-end testing, our solutions need to also consider security, performance, load, usability, and exploratory testing. When there's always another bug lurking on the periphery, it's perhaps most important that a team considers the levels of testing their solution demands and agrees upon a testing plan that outlines responsibilities and expectations. From NFRs to data management, from third party integration to environments, we'll discuss levels of consideration for maximum extermination.

### Unit testing:
- JUnit and Mockito: https://mkyong.com/unittest/unit-test-what-is-mocking-and-why/
- JUnit: https://www.vogella.com/tutorials/JUnit/article.html
- Mockito: https://www.vogella.com/tutorials/Mockito/article.html

### API Testing:
- Rest Assured: http://rest-assured.io/ 
- https://techbeacon.com/app-dev-testing/how-perform-api-testing-rest-assured
- https://www.opencodez.com/software-testing/api-testing-java-using-rest-assured.htm
- http://executeautomation.com/blog/an-introduction-to-cucumber-for-java/

### NFR and SRE:
- https://www.guru99.com/non-functional-testing.html
- https://www.atlassian.com/incident-management/devops/sre
- https://www.cio.com/article/3192531/why-you-need-a-systems-reliability-engineer.html

### Testing Types:
- https://dev.to/thejessleigh/different-types-of-testing-explained-1ljo
- https://medium.com/javascript-scene/behavior-driven-development-bdd-and-functional-testing-62084ad7f1f2
- https://studentaid.gov/sites/default/files/fsawg/static/gw/docs/ciolibrary/FSA_Enterprise_Test_Management_Standards.pdf
- https://www.testingexcellence.com/types-of-software-testing-complete-list/

### What works best for your teams
- Level of automation
- Use of manual testing
- Testing flow within sprint
- Data management
- Test case organization and record keeping

### Severity Level Ranking
1. Renders application or system inoperable. Widespread issue. Merits immediate attention.
2. Causes significant impact to business functions. No work-around exists. Task makes it into workflow as soon as possible.
3. Impacts functionality, but work-around exists or impact is accessible. Fixing issue can wait.
4. The problem has low impact to business function. It may never get fixed.

### NFRs
**Get doc from Carla**

### In Scope vs Out of Scope
In scope:
- Code we write (modules, components, services, API endpoints, DB access layer)
- Data management

Out of scope:
- Mobile or Tablet testing
- 3rd party API testing

### Timing of Test Execution
- at build time
- on each deploy
- on-going
- prior to prod release
- locally and often

### Testing Environment
- QA needs a dedicated environment
- Devs need to have local environment for both automated and manual testing
- Automated end-to-end testing environment necessary
- Wha

### Feature flags
- Role in testing process
-

### Team/Cross Team dynamics
- Is QA embedded on team or across teams
- Who writes Test Cases and who writes automated tests
- Whiteboard sessions
- Automation efficacy checks


### Levels of testing
- Tests done within team
    - Test automation
    - Manual testing
- Tests done by others
    - 3rd
