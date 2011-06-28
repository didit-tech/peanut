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
