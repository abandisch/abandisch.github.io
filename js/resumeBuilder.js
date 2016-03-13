// Bio JSON
var bio = {
    "name": "Alex Bandisch",
    "role": "Front-End Web Developer",
    "contacts": {
        "mobile": "+61 433 281 488",
        "email": "alexander.bandisch@gmail.com",
        "github": "https://github.com/abandisch",
        "twitter": "https://twitter.com/abandisch",
        "location": "Brisbane, Australia"
    },
    "welcomeMessage": "An ambitious problem solver with a passion for Front-End Web Development!",
    "skills": ["Bootstrap 3", "HTML", "JQuery", "CSS", "less", "PHP", "Grunt", "LAMP Stack"],
    "biopic": "http://i.imgur.com/CXkInEz.jpg"

};

// contactIcons JSON: this is used for the contact details on the footer (replaces the label text with Font Awesome icons)
var contactIcons = {
    "location": "fa-map-marker",
    "twitter": "fa-twitter",
    "email": "fa-envelope",
    "mobile": "fa-mobile",
    "github": "fa-github"
};

bio.display = function() {
    // Page Title
    var titleText = $("title").text();
    $("title").text(titleText + " - " + bio.name);

    // Name and Role
    $("#header").prepend(HTMLheaderRole.replace("%data%", bio.role));
    $("#header").prepend(HTMLheaderName.replace("%data%", bio.name));

    // Contact Info
    $("#topContacts").append(HTMLemail.replace("%data%", bio.contacts.email))
                     .append(HTMLmobile.replace("%data%", bio.contacts.mobile))
                     .append(HTMLlocation.replace("%data%", bio.contacts.location))
                     .append(HTMLgithub.replace("%data%", bio.contacts.github))
                     .append(HTMLtwitter.replace("%data%", bio.contacts.twitter));

    // Bio Picture
    $("#header").append(HTMLbioPic.replace("%data%", bio.biopic));

    // Welcome Message
    $("#header").append(HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage));

    // Skills
    if (bio.skills.length > 0) {
        $('#header').append(HTMLskillsStart);
        $(bio.skills).each(function(index, element) {
            $('#skills').append(HTMLskills.replace("%data%", element));
        });
    }

    // Footer contacts: show with Font Awesome icons instead of text
    var $footerContacts = $("#footerContacts");
    $.each(bio.contacts, function(contactType, contactData) {
        var icon = fontAwesomeIcon.replace("%data%", contactIcons[contactType]);
        var formattedContact = HTMLcontactGeneric.replace("%contact%", icon).replace("%data%", contactData);
        $footerContacts.append(formattedContact);
    });

    // Mobile view - Add 'Contact Details' button to show contact details
    $("#header").find("hr").after(contactDetailsButton);
    $("#topContacts").wrap(drawer);

};

// Education JSON
var formattedSchool, formattedOnlineCourse, $educationDiv = $("#education");
var education = {
    "schools" : [
        {
            "name": "USQ",
            "location": "Toowoomba, Australia",
            "degree": "Bachelor of Information Technology",
            "majors": [
                "Networking"
            ],
            "dates": 2004,
            "url" : "http://usq.edu.au"
        }
    ],
    "onlineCourses" : [
        {
            "title": "Front-End Web Developer Nanodegree",
            "school": "Udacity",
            "date": 2016,
            "url": "https://www.udacity.com/"
        }
    ]
};

education.display = function() {
    // Add schools
    $(education.schools).each(function(index, schoolElement) {
        formattedSchool = $(HTMLschoolStart).append(HTMLschoolName.replace("%data%", schoolElement.name) + HTMLschoolDegree.replace("%data%", schoolElement.degree))
                                            .append(HTMLschoolDates.replace("%data%", schoolElement.dates))
                                            .append(HTMLschoolLocation.replace("%data%", schoolElement.location));
        if (schoolElement.majors.length > 0) {
            formattedSchool.append(HTMLschoolMajor.replace("%data%", schoolElement.majors.join(", ")));
        }
        $educationDiv.append(formattedSchool);
    });

    // Add online courses
    if (education.onlineCourses.length > 0) {
        $educationDiv.append(HTMLonlineClasses);

        $(education.onlineCourses).each(function(index, onlineCourseElement) {
            formattedOnlineCourse = $(HTMLschoolStart).append(HTMLonlineTitle.replace("%data%", onlineCourseElement.title) + HTMLonlineSchool.replace("%data%", onlineCourseElement.school))
                                                      .append(HTMLonlineDates.replace("%data%", onlineCourseElement.date))
                                                      .append(HTMLonlineURL.replace("%data%", onlineCourseElement.url));
            $educationDiv.append(formattedOnlineCourse);
        });
    }
};

// Work JSON
var $formattedWork, work;

work = {
    "jobs" : [
        {
            "employer": "PNGConnect",
            "title": "Project Manager",
            "location": "Brisbane, Australia",
            "dates": "2014 - Current",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere sem est, nec sagittis nunc aliquet ac. Quisque convallis dui a erat porttitor, vel faucibus magna ultricies. Vestibulum quis dapibus metus"
        },
        {
            "employer": "GBST",
            "title": "Implementation Consultant",
            "location": "Brisbane, Australia",
            "dates": "2006 - 2014",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere sem est, nec sagittis nunc aliquet ac. Quisque convallis dui a erat porttitor, vel faucibus magna ultricies. Vestibulum quis dapibus metus"
        }
    ]

};

work.display = function() {
    for (var job in work.jobs) {
        $("#workExperience").append(HTMLworkStart);
        $formattedWork = HTMLworkEmployer.replace("%data%", work.jobs[job].employer) + HTMLworkTitle.replace("%data%", work.jobs[job].title);
        $formattedWork = $formattedWork + HTMLworkDates.replace("%data%", work.jobs[job].dates);
        $formattedWork = $formattedWork + HTMLworkLocation.replace("%data%", work.jobs[job].location);
        $formattedWork = $formattedWork + HTMLworkDescription.replace("%data%", work.jobs[job].description);
        $(".work-entry:last").append($formattedWork);
    }
};

// Projects JSON
var projects = [
    {
        "title": "About Me - Front-End Apprentice",
        "dates": "September 2015",
        "description": "First Project at Udacity, containing a basic introduction to HTML and CSS",
        "image": ["http://i.imgur.com/bnROPgz.jpg"]
    },
    {
        "title": "Build a Portfolio Site",
        "dates": "September 2015",
        "description": "Second Project at Udacity, showing skills in responsive web design",
        "image": ["http://i.imgur.com/FzgwxpR.jpg"]
    }
];

projects.display = function() {
    // Add each project to the resume
    $(this).each(function(index, projectElement) {
        var formattedProject = $(HTMLprojectStart).append(HTMLprojectTitle.replace("%data%", projectElement.title))
                                                  .append(HTMLprojectDates.replace("%data%", projectElement.dates))
                                                  .append(HTMLprojectDescription.replace("%data%", projectElement.description));

        if (projectElement.image.length > 0) {
            formattedProject.append(HTMLprojectImage.replace("%data%", projectElement.image));
        }

        $("#projects").append(formattedProject);
    });

    // Add CSS to display projects next to each other rather than stacked
    $("#projects").addClass("flex-box");
    $("#projects").find(".project-entry").addClass("flex-item");
    $("#projects").find("h2").addClass("flex-item");
};

// Call the display functions for each object to display the resume information
bio.display();
work.display();
projects.display();
education.display();

// Display Google Map with bouncing markers on each location
$("#mapDiv").append(googleMap);

// Mobile view - Add event handler for clicking on 'contact-details' button
$("#contact-details").on("click", function(event) {
    $("#drawer").fadeToggle("fast");
    $(this).toggleClass('clicked');
    event.stopPropagation();
});

// Mobile view - Add event handler for main div to hide contact details
$("#main").on("click", function(event) {
    if ($("#contact-details").hasClass("clicked")) {
        $("#contact-details").removeClass("clicked");
        $("#drawer").fadeOut("fast");
    }


});

/* International Button Exercise - Commented out, as this is not required for the resume ... at least I'm pretty sure it's not */
/*
 $("#header").append(internationalizeButton);
 function inName() {

 var name = "Alex Bandisch";
 var newName, firstName, lastName, finalName = "";

 newName = name.trim().split(" ");

 if (newName.length === 2) {
 firstName = newName[0].toLowerCase();
 lastName = newName[1].toUpperCase();
 firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
 finalName = firstName + " " + lastName;
 } else {
 return "Valid First and Last name are required";
 }

 return finalName;

 }
 */

