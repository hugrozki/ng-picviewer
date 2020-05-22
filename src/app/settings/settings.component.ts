import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from '../shared/feed.service';
import { Settings } from '../shared/interfaces';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'npv-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsFormData: Settings;
  disallowSave = true;
  formMessage = '';

  save(form: NgForm) {
    if (form.invalid) { return; }

    this.service.setSettings(this.settingsFormData);
    this.formMessage = "Ajustes guardados."
  }

  constructor(private service: FeedService) { }

  ngOnInit(): void {
    this.settingsFormData = this.service.getSettings();
  }

  get getData() {
    return JSON.stringify(this.settingsFormData)
  }

}
