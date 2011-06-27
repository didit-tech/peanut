Feature: Feature Parser
  In order to test my applications
  As a developer
  I want peanut to parse a feature file

  Background:
    Given the Feature description is:
    """
    Feature: Sample Feature
      In order to do something
      As a role
      I want some functionality
    """

  Scenario: Simple Feature
    Given the Feature contains
    """
      Scenario: Sample Scenario
        Given some setup
        And some more setup
        But not another setup
        When some action
        And some other action
        But not another action
        Then some result
        And another result
        But not that result
    """

    When the Feature is parsed
    Then the Feature should be named "Sample Feature"
    And it should have a Scenario called "Sample Scenario"
    And it should have the following Steps:
      | Name                   |
      | Given some setup       |
      | And some more setup    |
      | But not another setup  |
      | When some action       |
      | And some other action  |
      | But not another action |
      | Then some result       |
      | And another result     |
      | But not that result    |

  Scenario: Simple Background
    Given the Feature contains
    """
      Background:
        Given some background step
        And another background step
        But not a background step
        When I do something in the background
        And I do something else in the background
        But I don't do that in the background
        Then I should have a complete background
        And it should run all the way through
        But it shouldn't break
    """

    When the Feature is parsed
    Then it should have a Background
    And the Background should have the following Steps:
      | Name                                      |
      | Given some background step                |
      | And another background step               |
      | But not a background step                 |
      | When I do something in the background     |
      | And I do something else in the background |
      | But I don't do that in the background     |
      | Then I should have a complete background  |
      | And it should run all the way through     |
      | But it shouldn't break                    |
      