Feature: Teardown
  In order to write tests that clean up after themselves
  As a developer
  I want peanut to run a teardown after every scenario

  Background:
    Given the Feature header is:
    """
    Feature: Sample Feature
      In order to do something
      As a role
      I want some functionality
    """

 Scenario: Simple Teardown
    Given the Feature contains
    """
      Scenario: Sample scenario
        Given I set up some data
        When I exercise my system
        Then something happened

      Teardown:
        Then clean up my data
    """
    When the Feature is parsed
    Then it should have a a Teardown
    And the Teardown should have the following Steps:
      | Name                  |
      | Then clean up my data |