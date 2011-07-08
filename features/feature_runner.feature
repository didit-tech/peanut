Feature: Feature Runner

  Scenario Outline: With Table and Pystring Interpolation
    Given I have a Pystring with
      """
        I am a <pystring>
      """
    And I have a Table with
      | <header> |
      | value 1  |
    Then the Pystring should be "I am a <pystring>"
    And I should have a table header of "<header>"

    Scenarios:
      | header                | pystring       |
      | boring table header   | wacky pystring |
      | exciting table header | funky pystring |

  Scenario Outline: With Arguments
    Given I have a Scenario with an <argument>
    Then the argument should be <argument>

    Examples:
      | argument   |
      | "argValue" |
      | 42         |

  Scenario: Repeating Steps 1
    When my arg equals "First Scenario"
    Then it should have the first Scenario's value

  Scenario: Repeating Steps 2
    When my arg equals "Second Scenario"
    Then it should have the second Scenario's value

  Scenario: Repeating Steps 3
    When my arg equals "Third Scenario"
    Then it should have the third Scenario's value
