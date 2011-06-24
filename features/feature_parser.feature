Feature: Feature Parser
  In order to test my applications
  As a developer
  I want peanut to parse a feature file

  Scenario: Simple Feature
    Given the feature file is
    """
      Feature: Sample Feature
      In order to do something
      As a role
      I want some functionality

      Scenario: Sample Scenario
        Given some setup
        When some action
        Then some result
    """

    When the file is parsed

    Then the Feature should be named "Sample Feature"
    And it should have a Scenario called "Sample Scenario"
    And it should have the following Steps:
      | Name             |
      | Given some setup |
      | When some action |
      | Then some result |
