%lex

PyDelim           \"\"\"
AnyBeforePyDelim  (.|\n(?!\s*{PyDelim}))
AnyBeforeLastPipe (.|\n(?=\s*\|))

%%

\n+                                         return 'NEWLINE'
\s+                                         /* skip whitespace */
{PyDelim}{AnyBeforePyDelim}+\n\s*{PyDelim}  return 'PYSTRING'
\|{AnyBeforeLastPipe}+\|                    return 'TABLE'
^"$serial"                                  return 'SERIAL'
^"$timeout "(\d+)                           return 'TIMEOUT'
^"@"(\w+)                                   return 'TAGS'
^"#".+                                      return 'COMMENT'
^"Feature:"                                 return 'FEATURE'
^"Background:"                              return 'BACKGROUND'
^"Teardown:"                                return 'TEARDOWN'
^"Scenario:"                                return 'SCENARIO'
^"Scenario Outline:"                        return 'OUTLINE'
^"Examples:"                                return 'EXAMPLE'
^"Scenarios:"                               return 'EXAMPLE'
^"Given"                                    return 'GIVEN'
^"When"                                     return 'WHEN'
^"Then"                                     return 'THEN'
^"And"                                      return 'AND'
^"But"                                      return 'BUT'
(.+)                                        return 'LINE'
<<EOF>>                                     return 'EOF'

/lex

%start Program

%%

Program
  : SourceElements
  ;

SourceElements
  : Feature
  | SourceElements Token
  ;

Feature
  : FEATURE {
      new yy.Feature(yy.file, ['FEATURE', @1.first_line, $1]);
    }
  | SERIAL Whitespace Feature {
      new yy.Serial(yy.file, ['SERIAL_FEATURE', @1.first_line, $1]);
    }
  | TIMEOUT Whitespace Feature {
      new yy.Timeout(yy.file, ['FEATURE_TIMEOUT', @1.first_line, $1]);
    }
  | TAGS Whitespace Feature {
      new yy.Tag(yy.file, ['FEATURE_TAG', @1.first_line, $1]);
    }
  | Feature LINE {
      new yy.Line(yy.file, ['FEATURE_DESCRIPTION', @2.first_line, $2]);
    }
  ;

Token
  : Background
  | Scenario
  | Outline
  | Pystring
  | Table
  | Examples
  | Line
  | Whitespace
  | Teardown
  | EOF { return yy.EOF(yy.file); }
  ;

Teardown
  : /* empty */
  | TEARDOWN {
      new yy.Teardown(yy.file, ['TEARDOWN', @1.first_line, $1]);
    }
  | Teardown LINE {{
      if ($1 !== undefined) {
        new yy.Line(yy.file, ['TEARDOWN_DESCRIPTION', @2.first_line, $2]);
      }
    }}
  | Teardown Steps
  ;


Background
  : /* empty */
  | BACKGROUND {
      new yy.Background(yy.file, ['BACKGROUND', @1.first_line, $1]);
    }
  | Background LINE {{
      if ($1 !== undefined) {
        new yy.Line(yy.file, ['BACKGROUND_DESCRIPTION', @2.first_line, $2]);
      }
    }}
  | Background Steps
  ;

Scenario
  : SCENARIO {
      new yy.Scenario(yy.file, ['SCENARIO', @1.first_line, $1]);
    }
  | TAGS Whitespace Scenario {
      new yy.Tag(yy.file, ['SCENARIO_TAG', @1.first_line, $1]);
    }
  | Scenario LINE {
      new yy.Line(yy.file, ['SCENARIO_DESCRIPTION', @2.first_line, $2]);
    }
  | Scenario Steps
  ;

Outline
  : OUTLINE {
      new yy.Outline(yy.file, ['OUTLINE', @1.first_line, $1]);
    }
  | TAGS Whitespace Outline {
      new yy.Tag(yy.file, ['OUTLINE_TAG', @1.first_line, $1]);
    }
  | Outline LINE {
      new yy.Line(yy.file, ['OUTLINE_DESCRIPTION', @2.first_line, $2]);
    }
  ;

Examples
  : EXAMPLE Whitespace TABLE {
      new yy.Examples(yy.file, ['EXAMPLES', @1.first_line, $3]);
    }
  ;

Steps
  : GIVEN LINE {
      new yy.Step(yy.file, ['GIVEN', @1.first_line, $1]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', @2.first_line, $2]);
    }
  | WHEN LINE {
      new yy.Step(yy.file, ['WHEN', @1.first_line, $1]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', @2.first_line, $2]);
    }
  | THEN LINE {
      new yy.Step(yy.file, ['THEN', @1.first_line, $1]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', @2.first_line, $2]);
    }
  | AND LINE {
      new yy.Step(yy.file, ['AND', @1.first_line, $1]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', @2.first_line, $2]);
    }
  | BUT LINE {
      new yy.Step(yy.file, ['BUT', @1.first_line, $1]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', @2.first_line, $2]);
    }
  ;

Whitespace
  : NEWLINE {
      new yy.Newline(yy.file, ['NEWLINE', yylineno, $1]);
    }
  | COMMENT {
      new yy.Comment(yy.file, ['COMMENT', yylineno, $1]);
    }
  ;

Pystring
  : /* empty */
  | PYSTRING {
      new yy.Pystring(yy.file, ['PYSTRING', @1.first_line, $1]);
    }
  ;

Table
  : /* empty */
  | TABLE {
      new yy.Table(yy.file, ['TABLE', @1.first_line, $1]);
    }
  ;

Line
  : LINE {
      new yy.Line(yy.file, ['LINE', @1.first_line, $1]);
    }
  ;
