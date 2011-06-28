#Feature: Step Formatter
#
#  Scenario: Basic step formatting
#    Given the Step AST is
#      | Step Name | Line Number | Description | Parent Step | Step Type | Is Background |
#      | Given     | 7           | i work      | undefined   | PYSTRING  | Background    |
#
#    And the step's Pystring is
#      """
#      I am a pystring
#      """
#
#    When the Step is formatted
#    Then the formatted Step should include:
#      | isBackground    | true            |
#      | lineno          | 7               |
#      | pattern         | i work          |
#      | step            | Given           |
#      | text            | i work          |
#      | type            | pystring        |
#      | args            | , pystring      |
#      | tableOrPyString | I am a pystring |
#
#  Scenario: Format string args
#    Given the Step AST is
#      | Step Name | Line Number | Description          | Parent Step | Step Type | Is Background |
#      | Given     | 7           | that "this" is setup |             |           |               |
#
#    When the Step is formatted
#    Then the formatted Step Definition should have "this" as an arg
#
#Scenario: Format string args
#  Given the Step AST is
#  When the Step is formatted
#  Then "" should be a Step arg

  # Scenario: Scenario With Args
  #  Given the Feature contains
  #  """
  #    Scenario: Args
  #      Given that "this" is setup
  #      When we do something 10 times
  #      Then we should see "Tommy's" toothpick
  #      And it should equal 23.23
  #      But it shouldn't equal .99
  #  """
  #
  #  When the Steps are formatted
  #  Then the first step should have "this" as an argument
