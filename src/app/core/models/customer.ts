/**
 * @author amayuru_i
 * @project crm-frontend
 */
// src/app/core/models/customer.model.ts

export type CustomerStatus =
  'PROSPECT' | 'ACTIVE' | 'INACTIVE' | 'CHURNED';

export interface Customer {
  id:             number;
  firstName:      string;
  lastName:       string;
  fullName:       string;
  email:          string;
  phone:          string;
  company:        string;
  industry:       string;
  status:         CustomerStatus;
  notes:          string;
  assignedToId:   number | null;
  assignedToName: string | null;
  createdAt:      string;
  updatedAt:      string;
}

export interface CustomerRequest {
  firstName:  string;
  lastName:   string;
  email:      string;
  phone:      string;
  company:    string;
  industry:   string;
  status:     CustomerStatus;
  notes:      string;
  assignedTo: number | null;
}
