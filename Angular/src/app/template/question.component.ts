import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'question',
    templateUrl: 'question.component.html'
})
export class QuestionComponent {
    // this input property aliases this child component property name 'questionForm' as 'group'
    @Input('group')
    public questionForm: FormGroup;
}