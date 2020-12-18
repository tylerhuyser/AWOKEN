# AWOKEN

## Overview

**AWOKEN** is a React-on-Rails app that helps *awken* users to bias. The app uses a variety of surveys in order to measure a user's biases (i.e. racism, sexism, etc.). The app also deploys an intervention that helps guide users to a more a*woke*n mindset.

[Deployed app](https://brave-neumann-a7bc83.netlify.app/) can be accessed here.

### Features

A-Woke-N enables companies to offer digitally-equipped and data-driven diversity & inclusion interventions. Upon registration, users will become associated with their employers using a unique access token -- thereby allowing companies to optimie the program throughout its flight. 

#### System Authentication & User Login

The application deploys a token-based authentication system in order facilitate user login. 

Unlike a session-based approach, users are not associated with login information. Instead, a unique token is used to carry client-host transactions.

**AWOKEN** uses a Ruby-on-Rails framework for its back-end. In order to facilitate login and session verification, the app deploys two methods that are stored in the authentication controller.

```

  def login
    @employee = Employee.find_by(username: login_params[:username])
    if @employee.authenticate(login_params[:password])
      token = encode({id: @employee.id})
      render json: {
        employee: @employee.attributes.except('password_digest'),
        token: token
        }, status: :ok
    else
      render json: { errors: 'unauthorized' }, status: :unauthorized
    end
  end
  
  # GET /auth/verify
  def verify
    render json: @current_employee.attributes.except('password_digest'), status: :ok
  end

```

### User Roles

There are two types of users that access AWOKEN: admins and employees. The user is offered a different experience depending on their role. 

Empoloyees are able to AWOKEN's bias-measuring tools, bias-reduction intervention, and educational models.

Admins are able to access data visualization tools the display insights about a cohort of employees.

In order to create two different roles, an 'admin' attribute is added to the 'user' model. The 'admin' attribute only accepts Boolean values. If the value is 'true', the user receives the 'admin' view. Conversely, if the valie is 'false' the user receives the employee version of the app.

AWOKEN enables companies to offer digitally-equipeed and data-driven diversity & inclusion programs. Upon registration, users will become associated with their employers using a unique access token. 

```

  create_table "employees", force: :cascade do |t|
    t.string "username"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.date "date_of_birth"
    t.boolean "admin", default: false
    t.bigint "company_id", null: false
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_employees_on_company_id"
  end

```

### The Implicit Aptitude Test (IAT)

In short, the Implicit Aptitude Test (IAT)  measures the strength of correlation between identities (i.e. African-Americans, LGBT+ people, etc.) and concepts (such as 'good' or 'bad') or stereotypes (such as intelligence or athletic prowess). 

The idea is that the faster that people are able to associate an identity with an idea reflects their unconscious biases concerning that identity. For example, if a user is able to more quickly associate the word "good" with images of lighter skinned people, then that would indicate greater bias towards lighter-skinned groups of people.

While taking an IAT, users are asked to quickly sort words into categories that are on the left and right hand side of the computer screen. The test is broken into five parts:

  1. Sorting words relating to concepts (i.e. identifying good vs. bad words). This step primes the participant for the exercise.
  2. Distinguishing between our two identity categories (i.e. light-skinned vs. dark-skinned). Again, this step primes the participant for the exercise.
  3. This section combines exercises 1 & 2. On the left-hand side would be the "good" and "light-skinned" categories, whereas on the right would be the "bad" and "dark-skinned" categories.
  4. This section flips the placement of identity concepts. Now, "dark-skinned" would be on the left and "light-skinned" would be on the right. The "good" and "bad" categories remain in their respective positions.
  5. This block repeats Block 2's priming procedure. Users will sort only light-skinned and dark-skinned images, however, their left and right placements will be flipped. 'Good' and 'Bad' words are omitted from this block of the test.
  6. This section repeats block 3, however the placement of "good" vs. "bad" concepts is flipped.
  7. Finally, this section repeats block 4, and, once again, the placement of "good" vs. "bad" concepts is flipped.
  
  | Block | Function | Left-Key Items | Right-Key Items |
  |-------|----------|----------------|-----------------|
  |   1   |  Priming |  'Good' Words  |  'Bad' Words    |
  |   2   |  Priming |  Dark-Skinned  |  Light-Skinned  |
  |   3   |  Test    |  'Good' Words + Dark-Skinned   |  'Bad Words' + Light-Skinned  |
  |   4   |  Test    |  'Good' Words + Light-Skinned  |  'Bad Words' + Dark-Skinned   |
  |   5   |  Priming |  Light-Skinned  |  Dark-Skinned  |
  |   6   |  Test    |  Light-Skinned + 'Bad' Words   |  Dark-Skinned + 'Good' Words  |    
  |   7   |  Test    |  Light-Skinned + 'Good' Words  |  Dark-Skinned + 'Bad' Words   |
  

Running in the background, is a timer that the test uses in order to record the user's reaction times for third and fifth sections of the test. These times are averaged, subtracted, and then the result is computed into a score informing a user of their bias. The user is presented this score.

### Education Modules

After completing the initial assessment, the user is presented with an intervention that educates users on five (5) prejudice self-reguation strategies:

* Stereotype Replacement
* Counter-Stereotypic Imaging
* Individualizing
* Perspective-Taking
* Contact

After being introducted to the intervention strategies, participants are presented with a questionnaire, in which they rate their attitdues towards each strategy from 1 ('Not at All') to 7 ('Very Often'):

* Perceived Likelihood of Using Each Strategy
* Willingness to Use each Strategy
* Perceived Difficulty of Using Each Strategy
* Perceived Effectiveness of Each Strategy
* Perceived Frequency of Opportunity to use each strategy

The participants scores are averaged to obtain a mean, in which higher numbers indiciate higher likelihood, willingness, perceived difficulty, perceived effectiveness, and perceived opportunity in relation to each respective prejudice self-regulation strategy.

### Intervention

For the next twelve (12) weeks, participants are presented with a journal and questionnaire. The questionnaire asks the user to provide open-ended responses about their experiences with using the five prejudice self-regulation strategies.

For each strategy, the participants were asked whether they had used the strategy since their last in-lab session. If they had used a strategy, the participants were subsequently asked to describe one or two situations in which they had used the strategy. At the end of the questionnaire, the participants were asked to share any additional comments about implementing the strategies.

After completing the journal, the user is once again presented with the intervention questionnaire, in which they rate their attitudes towards each strategy from 1 to 7.

### Cohort Data Visualization 

A feature available only to company admins. Corporate administrators will be able to assess the impact of the intervention on cohorts of employees over time. 

## Database Structure

Over the course of the Awoken diversity & inclusion program, users are served thirteen unique surveys--each of which measure a different dimension of bias. In order to measure the impact of the intervention in relation to these dimensions of bias, users are served some of these surveys multiple times.

The surveys are composed of many types of questions, ranging from multiple-choice to select-all-that-apply to open-ended free-response. In fact, there are over two hundred (200) unique questions across all thirteen surveys.

To recap: multiple survey formats, taken multiple times, composed of many forms of questions.

Using the D.R.Y. ("Don't Repeat Yourself!") principle, I decided to populate each survey format, each survey format's respective questions, and each question's respective options in the back-end. 

Each survey format has many questions. Each question has many options. And, each instance of a survey, has one and only one survey format.

Though complex, this architecture allows for many benefits:

* each survey is constructed by one component, reducing the quantity of code thirteen-fold
* news surveys can easily be added, removed, or altered
* survey data can more easily be analyzed for insights 

<img src="https://i.imgur.com/4gSrDDx.png" width="60%">

*NOTE:* In order to determine this format for the Awoken relational database, I used the following references:

* [Database Design for Survey](https://stackoverflow.com/questions/1764435/database-design-for-a-survey)

* [Associating Answers to Users](https://dba.stackexchange.com/questions/16002/survey-database-design-associate-an-answer-to-a-user)

* [Deciphering Database ER Diagrams for Questionnaires](https://stackoverflow.com/questions/37346994/deciphering-database-er-diagram-for-questionnaire)

* [Relational Database Structure for Survey Apps](https://stackoverflow.com/questions/51684573/relational-database-schema-for-survey-app)

## Key Components

Key Components Include:

* Login

* Register

* Survey Container

* Edit Survey Container

* Journals

* Questions

* Options

### Component Heirarchy

<img src="https://i.imgur.com/wZxi5M1.png" width="60%">

### Repo Structure

```

|_db
             |_migrate
             |_schema.rb
             |_seeds.rb
|_app
             |_controllers
                          |_answers_controller.rb
                          |_authentication_controller.rb
                          |_application_controller.rb
                          |_companies_controller.rb
                          |_employees_controller.rb
                          |_options_controller.rb
                          |_questions_controller.rb
                          |_surveys_formats_controller.rb
                          |_surveys_controller.rb
             |_models
                          |_answer.rb
                          |_application_record.rb
                          |_company.rb
                          |_employee.rb
                          |_option.rb
                          |_question.rb
                          |_surveys_format.rb
                          |_survey.rb
|_config
             |_routes
|_client
             |_src
                  |_app.js
                  |_components
                              |_Question
                              |_Option               
                  |_containers
                              |_MainContainer
                              |_SurveyContainer
                              |_EditContainer
                              
                  |_screens
                              |_Home
                              |_Journal
                              |_Login
                              |_Register
                  |_services

                              |_apiConfig.js
                              |_authjs
                              |_admin-info.js
                              |_answers.js
                              |_survey-constructors.js
                              |_surveys.js
                  |_layout
                              |_Layout
                              |_Header
                              |_Nav

```

## Wireframes

**Awoken Landing Page**

<img src="https://i.imgur.com/KVbKxzA.jpg" width="30%">

**Login**

<img src="https://i.imgur.com/6DVJK1M.jpg" width="30%">

**Complete Profile**

<img src="https://i.imgur.com/cox1QFt.jpg" width="30%">

**Home Screen**

<img src="https://i.imgur.com/DwTeIEY.jpg" width="30%">

**Calendar**

<img src="https://i.imgur.com/ib0rJ66.jpg" width="30%">

**Survey Instructions**

<img src="https://i.imgur.com/Y2A3n6a.jpg" width="30%">

**Example Journal**

<img src="https://i.imgur.com/FcS4RZ7.jpg" width="30%">

**Education Module**

<img src="https://i.imgur.com/hZKReWf.jpg" width="30%">