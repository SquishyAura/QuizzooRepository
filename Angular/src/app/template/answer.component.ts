import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'answer',
    templateUrl: 'answer.component.html'
})
export class AnswerComponent {
    // we will pass in question from App component
    @Input('group')
    public answerForm: FormGroup;
}