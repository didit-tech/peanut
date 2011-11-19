Feature: Feature Parser
  In order to test my applications
  As a developer
  I want peanut to parse a feature file

  Background:
    Given the Feature header is:
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

  # Scenario: Freeform Steps
  #    Given the Feature contains
  #    """
  #      Scenario: Sample Scenario
  #        Given I want to leave GWT
  #        When I ignore overbearing syntax rules
  #        They will be used as regular steps
  #    """
  #    When the Feature is parsed
  #    Then it should have the following Steps:
 # | Name                                   |
 # | Given I want to leave GWT              |
 # | When I ignore overbearing syntax rules |
 # | They will used as regular steps        |

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

  Scenario:

  Scenario: With Pystring
    Given the Feature contains
    """
      Scenario: Pystring Scenario
        Given some setup
        When the system is exercised
        Then the result should be expected
    """
    And the last Step has "I'm a funky pystring" as a Pystring
    When the Feature is parsed
    Then line 8 should have a Pystring argument "I'm a funky pystring"

  Scenario: Background with Pystring
    Given the Feature contains
    """
      Background:
        Given some setup
        When the system is exercised
        Then the result should be expected
    """
    And the last Step has "I'm a background pystring" as a Pystring
    When the Feature is parsed
    Then the background should have a Pystring argument "I'm a background pystring" at line 8

  Scenario: With Table
    Given the Feature contains
    """
      Scenario: Table Scenario
        Given some setup
          | That  | requires |
          | table | setup    |
        When the system is exercised
        Then the result should be expected
    """
    When the Feature is parsed
    Then line 6 should have the following Table argument
      | That  | requires |
      | table | setup    |

  Scenario: Background with Table
    Given the Feature contains
    """
      Background:
        Given some setup
        When the system is exercised
          | With  | Some |
          | Table | Args |
        Then the result should be expected
    """
    When the Feature is parsed
    Then the background should have the following table at line 7
      | With  | Some |
      | Table | Args |

  Scenario: With Tag
    Given the Feature contains
    """
      @tagged
      Scenario: Tagged Scenario
        Given some setup
        When the system is exercised
        Then the result should be expected
    """
    When the Feature is parsed
    Then the Scenario should be tagged with "tagged"

  Scenario Outline: With Scenario Outline
    Given the Feature contains
    """
      Scenario Outline: Curiousity
        Given some "<setup>"
        When the "<system>" is exercised
        Then the "<result>" should be expected

        Scenarios:
          | setup | system | result |
          | one   | two    | three  |
          | four  | five   | six    |
    """
    When the Feature is parsed
    Then the Scenario Outline should have 2 examples
    And Example <example> "<header>" should be "<val>"

    Examples:
      | example | header | val   |
      | 0       | setup  | one   |
      | 0       | system | two   |
      | 0       | result | three |
      | 1       | setup  | four  |
      | 1       | system | five  |
      | 1       | result | six   |

  Scenario: Serial Feature
    Given the Feature header is:
    """
    $serial
    Feature: Serial Feature
    """
    And the Feature contains
    """
      Scenario: Serial Scenario
        Given some setup
        When the system is exercised
        Then the result should be expected
    """
    When the Feature is parsed
    Then the Feature should be marked as serial

  Scenario: Serial Directive Before Tag
    Given the Feature header is:
    """
    $serial
    @serial
    Feature: Serial Feature
    """
    And the Feature contains
    """
      Scenario: Serial Scenario
        Given some setup
        When the system is exercised
        Then the result should be expected
    """
    When the Feature is parsed
    Then the Feature should be marked as serial
    And the Feature should be tagged as "serial"

  Scenario: Serial Directive After Tag
    Given the Feature header is:
    """
    @serial
    $serial
    Feature: Serial Feature
    """
    And the Feature contains
    """
      Scenario: Serial Scenario
        Given some setup
        When the system is exercised
        Then the result should be expected
    """
    When the Feature is parsed
    Then the Feature should be marked as serial
    And the Feature should be tagged as "serial"

  Scenario: Feature Timeout
    Given the Feature header is:
    """
    $timeout 10
    Feature: Feature Timeout
    """
    And the Feature contains
    """
      Scenario: Scenario With a Timeout
        Given some setup
        When the system is exercised
        Then the result should be expected
    """
    When the Feature is parsed
    Then the Feature should have a timeout of 10 seconds