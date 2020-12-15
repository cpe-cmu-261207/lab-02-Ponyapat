function Class(title,credits,letterGrade){
    var self = this;
    var gradeMapping = {
        'A+': 4.00,
        'A': 4.00,
        'A-': 3.70,
        'B+': 3.33,        
        'B': 3.00,
        'B-': 2.70,
        'C+': 2.30,
        'C': 2.00,
        'C-': 1.70,
        'D+': 1.30,
        'D': 1.00,
        'D-': 0.70
    }
    
    
    self.title = ko.observable(title);
    self.credits = ko.observable(credits);
    self.letterGrade = ko.observable(letterGrade);
    
    self.gpa = ko.computed(function(){        
        return gradeMapping[self.letterGrade()];
    });
}

function GpaCalcViewModel (){
    var self = this;
    self.classes = ko.observableArray();
    self.totalGPA = ko.computed(function() {
        var totalWeightedGPA = 0, totalCredits = 0;
        
        $.each(self.classes(), function() {             
            totalWeightedGPA += ( this.gpa() * this.credits() );
            totalCredits += (this.credits() * 1);
        })
        
        return totalWeightedGPA / totalCredits;
    });
    

    self.addClass = function(){        
        self.classes.push( new Class() );
    }

    
};

var viewModel = new GpaCalcViewModel();

ko.applyBindings( viewModel );
