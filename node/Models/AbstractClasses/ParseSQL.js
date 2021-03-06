/* ParseSql er en hjælpeklasse til Database.js.
 * ParseSql parser den SQL, som vi får leveret af databasen til et format, som frontend kan forstå
 * Klassen skal kunne parse alle former for input fra databasen, og sikre at JavaScript siden
 * af programmet stemmer overens med MySQL siden, som kan ses i constructoren
 */

class ParseSql {
  /* Dette er en oversigt over alle de tabelnavne, elementtyper og kolonnenavne som programmet gør brug af */
  constructor() {
    this.parsedData = [];
    /* Tabel navnene */
    this.databaseTable         = `database`;
    this.groupTable            = `user_group`;
    this.userTable             = `user`;
    this.documentTable         = `document`;
    this.sectionTable          = `document_section`;
    this.evaluationTable       = `evaluation`;
    this.quizQuestionTable     = `quiz_question`;
    this.quizResultTable       = `quiz_result`;
    this.flashcardTable        = `flashcard`;
    this.flashcardResultTable  = `flashcard_result`;
    this.keywordTable          = `keyword`;
    this.keywordLinkTable      = `keyword_link`;
    this.spacedRepetitionTable = `repetition_task`;
    /* Elementtypes */
    this.databaseType         = `test`;
    this.groupType            = `user_group`;
    this.userType             = `user`;
    this.documentType         = `document`;
    this.sectionType          = `section`;
    this.evaluationType       = `evaluation`;
    this.quizQuestionType     = `quiz_question`;
    this.quizResultType       = `quiz_result`;
    this.flashcardType        = `flashcard`;
    this.flashcardResultType  = `flashcard_result`;
    this.keywordType          = `keyword`;
    this.keywordLinkType      = `keyword_link`;
    this.spacedRepetitionType = `repetition_task`;
    /* ID kolonner der bruges alt efter hieraki */
    this.groupCol            = `ID_USER_GROUP`;
    this.userCol             = `ID_USER`;
    this.documentCol         = `ID_DOCUMENT`;
    this.sectionCol          = `ID_DOCUMENT_SECTION`;
    this.evaluationCol       = `ID_EVALUATION`;
    this.quizQuestionCol     = `ID_QUIZ_QUESTION`;
    this.quizResultCol       = `ID_QUIZ_RESULT`;
    this.flashcardCol        = `ID_FLASHCARD`;
    this.flashcardResultCol  = `ID_FLASHCARD_RESULT`;
    this.keywordCol          = `ID_KEYWORD`;
    this.keywordLinkCol      = `ID_KEYWORD_LINK`;
    this.attemptCol          = `ID_ATTEMPT`;
    this.spacedRepetitionCol = `ID_REPETITION_TASK`;
    /* kolonner i alle klasser */
    this.typeCol = `ELEMENT_TYPE`;
    /* Group kolonner */
    this.GNameCol = `NAME`;
    /* User kolonner */
    this.UUsernameCol     = `USER_NAME`;
    this.UPasswordCol     = `PASSWORD`;
    this.UFirstNameCol    = `FIRST_NAME`;
    this.ULastNameCol     = `LAST_NAME`;
    this.UEmailCol        = `EMAIL`;
    this.UStudySubjectCol = `STUDY_SUBJECT`;
    this.USemesterCol     = `SEMESTER`;
    this.UUniversityCol   = `UNIVERSITY`;
    /* Document kolonner */
    this.DTitleCol = `TITLE`;
    /* Section kolonner */
    this.SContentCol = `SECTION_CONTENT`;
    this.STitleCol   = `SECTION_TITLE`;
    this.STeaserCol  = `SECTION_TEASER`;
    this.SNumberCol  = `SECTION_NUMBER`;
    /* Evaluation kolonner */
    this.ETitleCol = `EVALUATION_TITLE`;
    /* QuizQuestion kolonner */
    this.QQQuestionCol    = `QUESTION`;
    this.QQAnswersCol     = `ANSWERS`;
    this.QQCorrectnessCol = `CORRECT_ANSWERS`;
    this.QQKeywordsCol    = `KEYWORD`;
    /* QuizResult Kolonner */
    this.QRAttemptCol     = `ID_ATTEMPT`;
    this.QRPointCol       = `POINT`;
    this.QRTotalCol       = `TOTAL`;
    this.QRResultCol      = `RESULT`;
    this.QRCreatedDateCol = `CREATED_DATE`;
    this.QRUserAnswerCol  = `USER_ANSWER`;

    /* Keyword kolonner */
    this.KKeywordCol = `KEYWORD`;
    /* KeywordLink kolonner */
    /* Spaced Repetition kolonner */
    this.SRRepetitionDateCol = `REPETITION_DATE`;
  }

  /* Formål: Dette er tiltænkt som den overordnede funktion, som bliver kaldt fra Database.js
   * Input:  Et array af data - kan godt modtage forskellige elementTyper i samme array eller et tomt array
   * Output: Hvis der modtages et tomt array er det stadig en valid query. Der returneres så blot en tom RowDataPacket
   *         Et array af data, som er parset/oversat fra databasesprog til frontendsprog eller et tomt array, hvis data er tom.
   */
  parseArrayOfObjects(data) {
    if (!Array.isArray(data)) { // giver en fejl hvis data ikke er et array
      throw new Error(`PARSESQL.JS_NOT_ARRAY: Data sendt til parseren er ikke et array, og kommer derfor ikke fra Database Modulet`);
    }
    if (data.length === 0) { // returnere en tom RowDataPacket hvis data er et tomt array (se Output)
      return [{ RowDataPacket: {} }];
    }
    for (let i = 0; i < data.length; i++) { // Looper igennem "data" og parser alle RowDataPacket til camelCase
      switch (data[i][this.typeCol]) {
        case this.databaseType:         this.parsedData.push(this.parseTest(data[i]));             break;
        case this.groupType:            this.parsedData.push(this.parseGroup(data[i]));            break;
        case this.userType:             this.parsedData.push(this.parseUser(data[i]));             break;
        case this.documentType:         this.parsedData.push(this.parseDocument(data[i]));         break;
        case this.sectionType:          this.parsedData.push(this.parseSection(data[i]));          break;
        case this.evaluationType:       this.parsedData.push(this.parseEvaluation(data[i]));       break;
        case this.quizQuestionType:     this.parsedData.push(this.parseQuizQuestion(data[i]));     break;
        case this.quizResultType:       this.parsedData.push(this.parseQuizResult(data[i]));       break;
        case this.spacedRepetitionType: this.parsedData.push(this.parseRepetitionTask(data[i]));   break;
        // case this.flashcardType:        this.parsedData.push(this.parseFlashcard(data[i]));        break;
        // case this.flashcardResultType:  this.parsedData.push(this.parseFlashcardResult(data[i]));  break;
        case this.keywordType:          this.parsedData.push(this.parseKeyword(data[i]));          break;
        case this.keywordLinkType:      this.parsedData.push(this.parseKeywordLink(data[i]));      break;
        default: throw new Error(`NO_ELEMENTTYPE: elementType er IKKE oprettet i ParseSQL.js!`);
      }
    }
    return this.parsedData;
  }

  /* Formål: At have en funktion der returnere testdata, når database modulet testes via Tape.
   * Input:  Et dataobjekt af typen "test" fra parse metoden.
   * Output: Et uparset objekt, der blot bruges til at se om ELEMENT_TYPE bliver korrekt parset.
   */
  parseTest(data) {
    return data;
  }

  /* Formål: At parse Group-data
   * Input:  Et dataobjekt af typen "Group" fra parse metoden.
   * Output: Et parset dataobjekt, som kan forståes på frontend
   */
  parseGroup(data) {
    return {
      elementType: data[this.typeCol],
      // IDs
      idGroup: data[this.groupCol],
      // data
      name: data[this.GNameCol],
    };
  }

  /* Formål: At parse User-data
   * Input:  Et dataobjekt af typen "user" fra parse metoden.
   * Output: Et parset dataobjekt, som kan forståes på frontend
   */
  parseUser(data) {
    return {
      elementType: data[this.typeCol],
      // IDs
      idUser: data[this.userCol],
      idGroup: data[this.groupCol],
      // data
      username: data[this.UUsernameCol],
      password: data[this.UPasswordCol],
      firstName: data[this.UFirstNameCol],
      lastName: data[this.ULastNameCol],
      email: data[this.UEmailCol],
      studySubject: data[this.UStudySubjectCol],
      semester: data[this.USemesterCol],
      university: data[this.UUniversityCol],
    };
  }

  /* Formål: At parse Document-data
   * Input:  Et dataobjekt af typen "document" fra parse metoden.
   * Output: Et parset dataobjekt, som kan forståes på frontend
   */
  parseDocument(data) {
    return {
      elementType: data[this.typeCol],
      // IDs
      idGroup: data[this.groupCol],
      idUser: data[this.userCol],
      idDocument: data[this.documentCol],
      // data
      title: data[this.DTitleCol],
    };
  }

  /* Formål: At parse Section-data og at oprette en teaser hvis den ikke er gemt i databasen.
   * Input:  Et dataobjekt af typen "section" fra parse metoden.
   * Output: Et parset dataobjekt, som kan forståes på frontend
   */
  parseSection(data) {
    return {
      elementType: data[this.typeCol],
      // IDs
      idGroup: data[this.groupCol],
      idUser: data[this.userCol],
      idDocument: data[this.documentCol],
      idSection: data[this.sectionCol],
      // data
      number: data[this.SNumberCol],
      title: data[this.STitleCol],
      content: data[this.SContentCol],
      teaser: data[this.STeaserCol] || (data[this.SContentCol] ? data[this.SContentCol].slice(0, 200) : undefined), // dette gøres for at undgå at der throwes en Error, i tilfælde af at data[this.SContentCol] giver undefined (eg. man kan ikke "slice" undefined)
    };
  }

  /* Formål: At parse Quiz-data
   * Input:  Et dataobjekt af typen "evaluation" fra parse metoden.
   * Output: Et parset dataobjekt, som kan forståes på frontend
   */
  parseEvaluation(data) {
    return {
      elementType: data[this.typeCol],
      // IDs
      idGroup: data[this.groupCol],
      idUser: data[this.userCol],
      idDocument: data[this.documentCol],
      idSection: data[this.sectionCol],
      idEvaluation: data[this.evaluationCol],
      // data
      title: data[this.ETitleCol],
    };
  }

  /* Formål: At parse QuizQuestion-data
   * Input:  Et dataobjekt af typen "quiz_question" fra parse metoden.
   * Output: Et parset dataobjekt, som kan forståes på frontend
   */
  parseQuizQuestion(data) {
    return {
      elementType: data[this.typeCol],
      // IDs
      idQuizQuestion: data[this.quizQuestionCol],
      idEvaluation: data[this.evaluationCol],
      idGroup: data[this.groupCol],
      // data
      question: data[this.QQQuestionCol],
      answers: data[this.QQAnswersCol].split(`;`),
      correctness: data[this.QQCorrectnessCol],
      keywords: data[this.QQKeywordsCol],
    };
  }

  /* Formål: At parse Quiz-result
   * Input:  Et dataobjekt af typen "quiz_result" fra parse metoden.
   * Output: Et parset dataobjekt, som kan forståes på frontend
   */
  parseQuizResult(data) {
    return {
      elementType: data[this.typeCol],
      // IDs
      idGroup: data[this.groupCol],
      idUser: data[this.userCol],
      idEvaluation: data[this.evaluationCol],
      idQuizResult: data[this.quizResultCol],
      idQuizQuestion: data[this.quizQuestionCol],
      // data
      attempt: data[this.QRAttemptCol],
      point: data[this.QRPointCol],
      total: data[this.QRTotalCol],
      result: data[this.QRResultCol],
      createdDate: data[this.QRCreatedDateCol],
      userAnswers: data[this.QRUserAnswerCol],
    };
  }

  /* Formål: At parse data fra repetition_task
   * Input:  Et array som indeholder nedenstående properties
   * Output: Et parset array, som kan forståes af spacedrepetition funktionerne
   */
  parseRepetitionTask(data) {
    return {
      idRepetitionTask: data[this.spacedRepetitionCol],
      idQuizQuestion: data[this.quizQuestionCol],
      idUser: data[this.userCol],
      idGroup: data[this.groupCol],
      repetitionDate: data[this.SRRepetitionDateCol],
    };
  }

  /* Formål: At parse Quiz-resultData specialdesignet returværdi fra SQL databasen
   * Input:  Et array som indeholder nedenstående properties
   * Output: Et parset array, som kan forståes af spacedrepetition funktionerne
   */
  parseQuizResultsForSpacedRepetition(quizResultData) {
    const result = [];
    quizResultData.forEach((quizResult) => {
      result.push({
        idQuizQuestion: quizResult[this.quizQuestionCol],
        idUser: quizResult[this.userCol],
        recentResult: quizResult.RECENT_RESULT,
        recentAttemptDate: quizResult.RECENT_ATTEMPT_DATE,
        nextRepetition: quizResult.NEXT_REPITITION,
        repetitions: quizResult.TOTAL,
        failedAttempts: quizResult.FAILED_ATTEMPTS,
        successAttempts: quizResult.SUCESS_ATTEMPTS,
      });
    });

    return result;
  }

  /* Formål: At parse Keyword-data
   * Input:  Et dataobjekt af typen "keyword" fra parse metoden.
   * Output: Et parset dataobjekt, som kan forståes på frontend
   */
  parseKeyword(data) {
    return {
      elementType: data[this.typeCol],
      // IDs
      idKeyword: data[this.keywordCol],
      // data
      keyword: data[this.KKeywordCol],
    };
  }

  /* Formål: At parse et KeywordLink så et keyword kan linkes til forskellige instanser
   * Input:  Et dataobjekt af typen "keyword_link" fra parse metoden.
   * Output: Et parset dataobjekt, som kan forståes på backend og frontend
   */
  parseKeywordLink(data) {
    return {
      elementType: data[this.typeCol],
      // IDs
      idGroup: data[this.groupCol],
      idDocument: data[this.documentCol],
      idSection: data[this.sectionCol],
      idEvaluation: data[this.evaluationCol],
      idQuizQuestion: data[this.quizQuestionCol],
      idFlashcard: data[this.flashcardCol],
      idKeyword: data[this.keywordCol],
      idKeywordLink: data[this.keywordLinkCol],
      // data
    };
  }
}

module.exports = {
  ParseSql,
};
