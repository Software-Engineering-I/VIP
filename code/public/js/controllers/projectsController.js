/**
 * Created on 10/12/2015.
 */
angular.module('projectsController', ['projectServices'])
    .controller('projectsController', function($scope, $location, Projects) {

        //$scope.line = 'Projects';
        $scope.sortType = 'proj';
        $scope.sortReverse = false;
        $scope.searchBar = '';

        $scope.details = false;
        /* been minified, list of majors. could put into mongodb i guess*/
/*
        $scope.majorList = [{"majors":"Accounting"},{"majors":"Adult Education and Human Resource Development"},{"majors":"Advertising (Communication)"},{"majors":"African and African Diaspora Studies"},{"majors":"Anthropology/Sociology"},{"majors":"Applied Mathematics"},{"majors":"Architecture"},{"majors":"Art"},{"majors":"Art History"},{"majors":"Art Education"},{"majors":"Asian Studies"},{"majors":"Athletic Training"},{"majors":"Basic Biomedical Sciences"},{"majors":"Biochemistry"},{"majors":"Biology"},{"majors":"Biomedical Engineering"},{"majors":"Broadcast (Communication)"},{"majors":"Business Administration"},{"majors":"Chemistry"},{"majors":"Civil Engineering"},{"majors":"Communication"},{"majors":"Communication (Mass Communication)"},{"majors":"Communication Arts"},{"majors":"Computer Science"},{"majors":"Computer Engineering"},{"majors":"Construction Management"},{"majors":"Counselor Education"},{"majors":"Creative Writing"},{"majors":"Criminal Justice"},{"majors":"Curriculum & Instruction"},{"majors":"Cybersecurity"},{"majors":"Dietetics and Nutrition"},{"majors":"Digital Media Studies (Communication)"},{"majors":"Disaster Management"},{"majors":"Dramatic Arts"},{"majors":"Early Childhood Education"},{"majors":"Earth Sciences"},{"majors":"Economics"},{"majors":"Educational Leadership"},{"majors":"Educational Administration and Supervision"},{"majors":"Electrical Engineering"},{"majors":"Elementary Education"},{"majors":"Engineering Management"},{"majors":"Engineering (See Specializations)"},{"majors":"English"},{"majors":"Environmental Engineering"},{"majors":"Environmental Policy and Management"},{"majors":"Environmental Studies"},{"majors":"Exceptional Student Education"},{"majors":"Finance"},{"majors":"Foreign Language Education"},{"majors":"Forensic Science"},{"majors":"French"},{"majors":"Geography"},{"majors":"Geosciences"},{"majors":"Global and Sociocultural Studies"},{"majors":"Global Governance"},{"majors":"Global Strategic Communications"},{"majors":"Health Informatics and Management Systems"},{"majors":"Health Services Administration"},{"majors":"Higher Education Administration"},{"majors":"History"},{"majors":"Hospitality Administration/Management"},{"majors":"Human Resource Management"},{"majors":"Information Systems"},{"majors":"Information Technology"},{"majors":"Interdisciplinary Studies"},{"majors":"Interior Architecture"},{"majors":"International Business"},{"majors":"International Real Estate"},{"majors":"International Relations"},{"majors":"International/Intercultural Education"},{"majors":"Journalism (Communication)"},{"majors":"Landscape Architecture"},{"majors":"Latin American & Caribbean Studies"},{"majors":"Law"},{"majors":"Liberal Studies"},{"majors":"Linguistics"},{"majors":"Management"},{"majors":"Management Information Systems"},{"majors":"Marine Biology"},{"majors":"Marketing"},{"majors":"Mass Communication"},{"majors":"Materials Engineering"},{"majors":"Mathematics"},{"majors":"Mathematical Sciences"},{"majors":"Mechanical Engineering"},{"majors":"Medicine"},{"majors":"Military Science Electives"},{"majors":"Music Teacher Education"},{"majors":"Music"},{"majors":"Nursing"},{"majors":"Nursing Practice"},{"majors":"Occupational Therapy"},{"majors":"Philosophy"},{"majors":"Physical Education"},{"majors":"Physical Therapy"},{"majors":"Physician Assistant Studies"},{"majors":"Physics"},{"majors":"Political Science"},{"majors":"Portuguese"},{"majors":"Psychology"},{"majors":"Public Administration"},{"majors":"Public Affairs"},{"majors":"Public Health"},{"majors":"Public Relations (Communication)"},{"majors":"Reading Education"},{"majors":"Real Estate"},{"majors":"Recreation and Sports Management"},{"majors":"Religious Studies"},{"majors":"School Psychology"},{"majors":"Social Welfare"},{"majors":"Social Work"},{"majors":"Sociology"},{"majors":"Spanish"},{"majors":"Speech Language Pathology"},{"majors":"Special Education"},{"majors":"Statistics"},{"majors":"Student Counseling/Guidance/Counselor Education"},{"majors":"Studio Art"},{"majors":"Economics"},{"majors":"Telecommunications/Networking"},{"majors":"Theatre"},{"majors":"Urban Education"},{"majors":"Visual Arts"},{"majors":"Women's Studies"}];
*/
        $scope.majorList = [
            "Accounting",
            "Adult Education and Human Resource Development",
            "Advertising (Communication)",
            "African and African Diaspora Studies",
            "Anthropology/Sociology",
            "Applied Mathematics",
            "Architecture",
            "Art",
            "Art History",
            "Art Education",
            "Asian Studies",
            "Athletic Training",
            "Basic Biomedical Sciences",
            "Biochemistry",
            "Biology",
            "Biomedical Engineering",
            "Broadcast (Communication)",
            "Business Administration",
            "Chemistry",
            "Civil Engineering",
            "Communication",
            "Communication (Mass Communication)",
            "Communication Arts",
            "Computer Science",
            "Computer Engineering",
            "Construction Management",
            "Counselor Education",
            "Creative Writing",
            "Criminal Justice",
            "Curriculum & Instruction",
            "Cybersecurity",
            "Dietetics and Nutrition",
            "Digital Media Studies (Communication)",
            "Disaster Management",
            "Dramatic Arts",
            "Early Childhood Education",
            "Earth Sciences",
            "Economics",
            "Educational Leadership",
            "Educational Administration and Supervision",
            "Electrical Engineering",
            "Elementary Education",
            "Engineering Management",
            "Engineering (See Specializations)",
            "English",
            "Environmental Engineering",
            "Environmental Policy and Management",
            "Environmental Studies",
            "Exceptional Student Education",
            "Finance",
            "Foreign Language Education",
            "Forensic Science",
            "French",
            "Geography",
            "Geosciences",
            "Global and Sociocultural Studies",
            "Global Governance",
            "Global Strategic Communications",
            "Health Informatics and Management Systems",
            "Health Services Administration",
            "Higher Education Administration",
            "History",
            "Hospitality Administration/Management",
            "Human Resource Management",
            "Information Systems",
            "Information Technology",
            "Interdisciplinary Studies",
            "Interior Architecture",
            "International Business",
            "International Real Estate",
            "International Relations",
            "International/Intercultural Education",
            "Journalism (Communication)",
            "Landscape Architecture",
            "Latin American & Caribbean Studies",
            "Law",
            "Liberal Studies",
            "Linguistics",
            "Management",
            "Management Information Systems",
            "Marine Biology",
            "Marketing",
            "Mass Communication",
            "Materials Engineering",
            "Mathematics",
            "Mathematical Sciences",
            "Mechanical Engineering",
            "Medicine",
            "Military Science Electives",
            "Music Teacher Education",
            "Music",
            "Nursing",
            "Nursing Practice",
            "Occupational Therapy",
            "Philosophy",
            "Physical Education",
            "Physical Therapy",
            "Physician Assistant Studies",
            "Physics",
            "Political Science",
            "Portuguese",
            "Psychology",
            "Public Administration",
            "Public Affairs",
            "Public Health",
            "Public Relations (Communication)",
            "Reading Education",
            "Real Estate",
            "Recreation and Sports Management",
            "Religious Studies",
            "School Psychology",
            "Social Welfare",
            "Social Work",
            "Sociology",
            "Spanish",
            "Speech Language Pathology",
            "Special Education",
            "Statistics",
            "Student Counseling/Guidance/Counselor Education",
            "Studio Art",
            "Economics",
            "Telecommunications/Networking",
            "Theatre",
            "Urban Education",
            "Visual Arts",
            "Women's Studies"
        ];
        $scope.choice = new Array();

        Projects.all()
            .success(function(data){
                $scope.projects = data;
            });


        $scope.deleteProj = function(id){
            Projects.delete(id)
                .success(function(data){

                Projects.all()
                    .success(function(data){
                        $scope.projects = data;
                    });

                });
        };

        $scope.saveProj = function(){
            /*$scope.project.disc = $scope.selection;*/
            console.log("attempting: ", $scope.project)
            Projects.create($scope.project)
                .success(function(data){
                    $scope.projects = {};
                    $scope.projects.message = "success!";
                    $location.path('/projects')
                });
        };

        $scope.addMoreMajors = function(){
            var pos = $scope.selection.length + 1;
            $scope.choice.push($scope.selection);
        };/*            $scope.project.disc.push();*/

        $scope.testSave = function(){
            $scope.project.disc = $scope.choice;

            /* angular.copy($scope.selection, $scope.projects.disc);*/
            console.log($scope.selection);
            console.log($scope.project.disc);
        };

    })
        /*$state.go('newUiRouterStateYouWishToDisplay'); + inject $state for ui-route*/
        /*$location.path('/newNgRouteYouWishToDisplay'); + inject $location for ngRoute*/
    .controller('projectsEditController', function($scope, $stateParams, $location, Projects){

        $scope.majorList = [
            "Accounting",
            "Adult Education and Human Resource Development",
            "Advertising (Communication)",
            "African and African Diaspora Studies",
            "Anthropology/Sociology",
            "Applied Mathematics",
            "Architecture",
            "Art",
            "Art History",
            "Art Education",
            "Asian Studies",
            "Athletic Training",
            "Basic Biomedical Sciences",
            "Biochemistry",
            "Biology",
            "Biomedical Engineering",
            "Broadcast (Communication)",
            "Business Administration",
            "Chemistry",
            "Civil Engineering",
            "Communication",
            "Communication (Mass Communication)",
            "Communication Arts",
            "Computer Science",
            "Computer Engineering",
            "Construction Management",
            "Counselor Education",
            "Creative Writing",
            "Criminal Justice",
            "Curriculum & Instruction",
            "Cybersecurity",
            "Dietetics and Nutrition",
            "Digital Media Studies (Communication)",
            "Disaster Management",
            "Dramatic Arts",
            "Early Childhood Education",
            "Earth Sciences",
            "Economics",
            "Educational Leadership",
            "Educational Administration and Supervision",
            "Electrical Engineering",
            "Elementary Education",
            "Engineering Management",
            "Engineering (See Specializations)",
            "English",
            "Environmental Engineering",
            "Environmental Policy and Management",
            "Environmental Studies",
            "Exceptional Student Education",
            "Finance",
            "Foreign Language Education",
            "Forensic Science",
            "French",
            "Geography",
            "Geosciences",
            "Global and Sociocultural Studies",
            "Global Governance",
            "Global Strategic Communications",
            "Health Informatics and Management Systems",
            "Health Services Administration",
            "Higher Education Administration",
            "History",
            "Hospitality Administration/Management",
            "Human Resource Management",
            "Information Systems",
            "Information Technology",
            "Interdisciplinary Studies",
            "Interior Architecture",
            "International Business",
            "International Real Estate",
            "International Relations",
            "International/Intercultural Education",
            "Journalism (Communication)",
            "Landscape Architecture",
            "Latin American & Caribbean Studies",
            "Law",
            "Liberal Studies",
            "Linguistics",
            "Management",
            "Management Information Systems",
            "Marine Biology",
            "Marketing",
            "Mass Communication",
            "Materials Engineering",
            "Mathematics",
            "Mathematical Sciences",
            "Mechanical Engineering",
            "Medicine",
            "Military Science Electives",
            "Music Teacher Education",
            "Music",
            "Nursing",
            "Nursing Practice",
            "Occupational Therapy",
            "Philosophy",
            "Physical Education",
            "Physical Therapy",
            "Physician Assistant Studies",
            "Physics",
            "Political Science",
            "Portuguese",
            "Psychology",
            "Public Administration",
            "Public Affairs",
            "Public Health",
            "Public Relations (Communication)",
            "Reading Education",
            "Real Estate",
            "Recreation and Sports Management",
            "Religious Studies",
            "School Psychology",
            "Social Welfare",
            "Social Work",
            "Sociology",
            "Spanish",
            "Speech Language Pathology",
            "Special Education",
            "Statistics",
            "Student Counseling/Guidance/Counselor Education",
            "Studio Art",
            "Economics",
            "Telecommunications/Networking",
            "Theatre",
            "Urban Education",
            "Visual Arts",
            "Women's Studies"
        ];
        $scope.selection = [{major: null}];

        Projects.get($stateParams.project_id)
            .success(function(data){
                $scope.project = data;
            });

        $scope.saveUpdates = function(){
            $scope.message = '';

            Projects.update($stateParams.project_id, $scope.project)
                .success(function(data){
                    $scope.project = {};
                    $scope.message = data.message;
                    $location.path('/projects')
                });
        };


        /*
         used for updating status and/or comment and returns to proposal-feedback page
         Written by Lucas
         */
        $scope.saveUpdateView = function(){
            $scope.message = '';

            Projects.update($stateParams.project_id, $scope.project)
                .success(function(data){
                    $scope.project = {};
                    $scope.message = data.message;
                    $location.path('/proposal-feedback')
                });
        };


        /*DEPRECATED - NOT USED ANYMORE*/
        /*$scope.addMoreMajors = function(){
         $scope.project.disc.push({major: null});

         };*/

        $scope.removeMajor = function(index){
            $scope.project.disc.splice(index, 1);
        };

        $scope.testSave = function(){
            //$scope.project.disc = $scope.selection;
            /* angular.copy($scope.selection, $scope.projects.disc);*/
            $scope.exists = false;
            if($scope.project.disc.indexOf($scope.project.selection) == - 1){
                $scope.project.disc.push($scope.project.selection);
            }
        };
    });