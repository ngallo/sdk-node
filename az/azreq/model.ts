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
  kind?: string;
  id?: string;
}

/**
 * Entities represents the Entities.
 */
export interface Entities {
  schema?: string;
  items?: Record<string, any>[];
}

/**
 * Evaluation is the Evaluation object.
 */
export interface Evaluation {
  request_id?: string;
  subject?: Subject;
  resource?: Resource;
  action?: Action;
  context?: Record<string, any>;
}

/**
 * AuthorizationModel is the Authorization Model.
 */
export interface AZModel {
  zone_id: number;
  principal?: Principal;
  policy_store?: PolicyStore;
  entities: Entities;
}

/**
 * AuthorizationRequest is the Authorization Request object.
 */
export interface AZRequest {
  authorization_model: AZModel;
  request_id?: string;
  subject?: Subject;
  resource?: Resource;
  action?: Action;
  context?: Record<string, any>;
  evaluations?: Evaluation[];
}

/**
 * Principal is the principal object.
 */
export interface Principal {
  type?: string;
  id?: string;
  source?: string;
}

/**
 * Subject is the subject object.
 */
export interface Subject {
  type?: string;
  id?: string;
  source?: string;
  properties?: Record<string, any>;
}

/**
 * Resource is the resource object.
 */
export interface Resource {
  type?: string;
  id?: string;
  properties?: Record<string, any>;
}

/**
 * Action is the action object.
 */
export interface Action {
  name?: string;
  properties?: Record<string, any>;
}

/**
 * ReasonResponse provides the rationale for the response.
 */
export interface ReasonResponse {
  Code?: string;
  Message?: string;
}

/**
 * ContextResponse represents the context included in the response.
 */
export interface ContextResponse {
  ID?: string;
  ReasonAdmin?: ReasonResponse | null;
  ReasonUser?: ReasonResponse | null;
}

/**
 * EvaluationResponse represents the result of the evaluation process.
 */
export interface EvaluationResponse {
  RequestID?: string;
  Decision?: boolean;
  Context?: ContextResponse | null;
}

/**
 * AZResponse represents the outcome of the authorization decision.
 */
export interface AZResponse {
  RequestID?: string;
  Decision: boolean;
  Context?: ContextResponse | null;
  Evaluations?: EvaluationResponse[];
}
