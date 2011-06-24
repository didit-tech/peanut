%lex

%%

\n+                       return 'NEWLINE'
\s+                       /* skip whitespace */
"\"\"\""(.|\n)+"\"\"\""   return 'PYSTRING'
^"@"(\w+)                 return 'TAGS'
^"#".+                    return 'COMMENT'
^"Feature:"               return 'FEATURE'
^"Background:"            return 'BACKGROUND'
^"Scenario:"              return 'SCENARIO'
^"Scenario Outline:"      return 'OUTLINE'
^"Given"                  return 'GIVEN'
^"When"                   return 'WHEN'
^"Then"                   return 'THEN'
^"And"                    return 'AND'
^"But"                    return 'BUT'
(.+)                      return 'LINE'
<<EOF>>                   return 'EOF'

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
  | Whitespace
  | Line
  | EOF { return yy.EOF(yy.file); }
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
  | Outline Steps
  ;

Steps
  : GIVEN LINE NEWLINE Pystring {
      new yy.Step(yy.file, ['GIVEN', @1.first_line, $1]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', @2.first_line, $2]);
    }
  | WHEN LINE NEWLINE Pystring {
      new yy.Step(yy.file, ['WHEN', @1.first_line, $1]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', @2.first_line, $2]);
    }
  | THEN LINE NEWLINE Pystring {
      new yy.Step(yy.file, ['THEN', @1.first_line, $1]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', @2.first_line, $2]);
    }
  | AND LINE NEWLINE Pystring {
      new yy.Step(yy.file, ['AND', @1.first_line, $1]);
      new yy.Line(yy.file, ['STEP_DESCRIPTION', @2.first_line, $2]);
    }
  | BUT LINE NEWLINE Pystring {
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

Line
  : LINE {
      new yy.Line(yy.file, ['LINE', @1.first_line, $1]);
    }
  ;
