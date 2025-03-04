// Copyright 2024 Nitro Agility S.r.l.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// SPDX-License-Identifier: Apache-2.0

/**
 * PolicyStore represents the Policy Store.
 */
export interface PolicyStore {
  kind: string;
  id: string;
}

/**
 * Entities represents the Entities.
 */
export interface Entities {
  schema: string;
  items: Record<string, any>[];
}

/**
 * Evaluation is the Evaluation object.
 */
export interface Evaluation {
  requestID?: string;
  subject?: Subject;
  resource?: Resource;
  action?: Action;
  context?: Record<string, any>;
}

/**
 * azModel is the Authorization Model.
 */
export interface AZModel {
  zoneID: number;
  principal?: Principal;
  policyStore?: PolicyStore;
  entities: Entities;
}

/**
 * AZRequest is the AZRequest object.
 */
export interface AZRequest {
  azModel: AZModel;
  requestID?: string;
  subject?: Subject;
  resource?: Resource;
  action?: Action;
  context?: Record<string, any>;
  evaluations: Evaluation[];
}

/**
 * Principal is the principal object.
 */
export interface Principal {
  type: string;
  id: string;
  source?: string;
}

/**
 * Subject is the subject object.
 */
export interface Subject {
  type: string;
  id: string;
  source?: string;
  properties?: Record<string, any>;
}

/**
 * Resource is the resource object.
 */
export interface Resource {
  type: string;
  id?: string;
  properties?: Record<string, any>;
}

/**
 * Action is the action object.
 */
export interface Action {
  name: string;
  properties?: Record<string, any>;
}

/**
 * ReasonResponse provides the rationale for the response.
 */
export interface ReasonResponse {
  code?: string;
  message?: string;
}

/**
 * ContextResponse represents the context included in the response.
 */
export interface ContextResponse {
  id?: string;
  reasonAdmin?: ReasonResponse;
  reasonUser?: ReasonResponse;
}

/**
 * EvaluationResponse represents the result of the evaluation process.
 */
export interface EvaluationResponse {
  requestID?: string;
  decision?: boolean;
  context?: ContextResponse;
}

/**
 * AZResponse represents the outcome of the authorization decision.
 */
export interface AZResponse {
  requestID?: string;
  decision: boolean;
  context?: ContextResponse;
  evaluations?: EvaluationResponse[];
}
