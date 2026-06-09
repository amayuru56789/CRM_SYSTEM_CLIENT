import {Component, inject, OnInit, signal} from '@angular/core';
import {AuthService} from '../../core/auth/auth.service';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/list';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

export interface KpiCard {
  label:    string;
  value:    string;
  change:   number;
  icon:     string;
  color:    string;
  bgColor:  string;
}

export interface RecentActivity {
  type:     string;
  message:  string;
  time:     string;
  icon:     string;
  color:    string;
}

export interface TopDeal {
  company:  string;
  value:    number;
  stage:    string;
  initials: string;
  color:    string;
}

@Component({
  selector: 'app-dashboard.component',
  imports: [
    MatIcon,
    MatDivider,
    MatButton,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {

  private authService = inject(AuthService);
  currentUser= this.authService.currentUser;

  greeting = signal('');

  kpiCards: KpiCard[] = [
    {
      label:   'Total Customers',
      value:   '1,284',
      change:  +12.5,
      icon:    'people',
      color:   '#6c63ff',
      bgColor: '#f0efff',
    },
    {
      label:   'Active Leads',
      value:   '348',
      change:  +8.2,
      icon:    'trending_up',
      color:   '#0ea5e9',
      bgColor: '#e0f2fe',
    },
    {
      label:   'Deals Won',
      value:   '$94,200',
      change:  +23.1,
      icon:    'handshake',
      color:   '#10b981',
      bgColor: '#d1fae5',
    },
    {
      label:   'Open Deals',
      value:   '57',
      change:  -4.3,
      icon:    'pending_actions',
      color:   '#f59e0b',
      bgColor: '#fef3c7',
    },
  ];

  recentActivities: RecentActivity[] = [
    {
      type:    'New Lead',
      message: 'TechCorp Ltd added as new lead',
      time:    '5 min ago',
      icon:    'person_add',
      color:   '#6c63ff',
    },
    {
      type:    'Deal Won',
      message: 'Acme Solutions deal closed — $12,000',
      time:    '1 hour ago',
      icon:    'emoji_events',
      color:   '#10b981',
    },
    {
      type:    'Meeting',
      message: 'Call scheduled with BlueStar Inc',
      time:    '2 hours ago',
      icon:    'phone_in_talk',
      color:   '#0ea5e9',
    },
    {
      type:    'Follow Up',
      message: 'Reminder: Follow up with GreenField',
      time:    '3 hours ago',
      icon:    'notifications',
      color:   '#f59e0b',
    },
    {
      type:    'New Customer',
      message: 'SkyBridge Corp converted from lead',
      time:    'Yesterday',
      icon:    'verified_user',
      color:   '#10b981',
    },
  ];

  topDeals: TopDeal[] = [
    { company: 'Acme Solutions',  value: 48000, stage: 'NEGOTIATION',  initials: 'AS', color: '#6c63ff' },
    { company: 'TechCorp Ltd',    value: 32000, stage: 'PROPOSAL',     initials: 'TC', color: '#0ea5e9' },
    { company: 'BlueStar Inc',    value: 27500, stage: 'QUALIFIED',    initials: 'BI', color: '#10b981' },
    { company: 'GreenField Co',   value: 19800, stage: 'NEGOTIATION',  initials: 'GF', color: '#f59e0b' },
    { company: 'SkyBridge Corp',  value: 15200, stage: 'PROPOSAL',     initials: 'SC', color: '#ef4444' },
  ];

  pipelineStages = [
    { label: 'Prospect',     count: 24, value: 48000,  color: '#e0e7ff', bar: '#6c63ff', width: 90 },
    { label: 'Qualified',    count: 18, value: 36000,  color: '#e0f2fe', bar: '#0ea5e9', width: 70 },
    { label: 'Proposal',     count: 12, value: 24000,  color: '#d1fae5', bar: '#10b981', width: 50 },
    { label: 'Negotiation',  count:  8, value: 16000,  color: '#fef3c7', bar: '#f59e0b', width: 35 },
    { label: 'Closed Won',   count:  5, value: 10000,  color: '#dcfce7', bar: '#22c55e', width: 20 },
  ];

    ngOnInit(): void {
      this.setGreeting();
    }

  setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12)      this.greeting.set('Good morning');
    else if (hour < 17) this.greeting.set('Good afternoon');
    else                this.greeting.set('Good evening');
  }

  getStageClass(stage: string): string {
    const map: Record<string, string> = {
      'PROSPECT':    'badge-prospect',
      'QUALIFIED':   'badge-qualified',
      'PROPOSAL':    'badge-proposal',
      'NEGOTIATION': 'badge-negotiation',
      'CLOSED_WON':  'badge-won',
      'CLOSED_LOST': 'badge-lost',
    };
    return map[stage] ?? 'badge-prospect';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style:    'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  }

}
