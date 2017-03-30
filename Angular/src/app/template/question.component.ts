import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'question',
    templateUrl: 'question.component.html'
})
export class QuestionComponent {
    // we will pass in question from App component
    @Input('group')
    public questionForm: FormGroup;
}