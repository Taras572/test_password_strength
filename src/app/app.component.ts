import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'task';

    public lineWidth: number = 0;
    public lineColor: string = ''
    public singPass!: UntypedFormGroup;
    public text: boolean = false;

    constructor(
        private fb: UntypedFormBuilder,
    ) { }


    ngOnInit(): void {
        this.initPass();
    }

    initPass(): void {
        this.singPass = this.fb.group({
            password: ['']
        })
    }

    checkPass() {
        const count = this.singPass.value.password;
        let glob = /^[^\s]{8,}$/.test(count);
        let regExpSumb = /\S\W/.test(count);
        let regExpNumb = /\d/.test(count);
        let regExplett = /[A-Za-z]/.test(count);
        if (glob) {
            this.text=false;
            if (regExpNumb && regExpSumb && regExplett) {
                this.lineWidth = 100;
                this.lineColor = 'green';
            }
            else if (regExpNumb && regExpSumb || regExpSumb && regExplett || regExpNumb && regExplett) {
                this.lineWidth = 2 / 3 * 100;
                this.lineColor = 'yellow';
            }
            else if (regExpNumb || regExpSumb || regExplett) {
                this.lineWidth = 1 / 3 * 100;
                this.lineColor = 'red';
            }
        }
        else {this.lineWidth = 0; this.text=true;};
    }

}
