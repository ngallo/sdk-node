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
  Kind?: string;
  ID?: string;
}

/**
 * Entities represents the Entities.
 */
export interface Entities {
  Schema?: string;
  Items?: Record<string, any>[];
}

/**
 * Evaluation is the Evaluation object.
 */
export interface Evaluation {
  RequestID?: string;
  Subject?: Subject;
  Resource?: Resource;
  Action?: Action;
  Context?: Record<string, any>;
}

/**
 * azModel is the Authorization Model.
 */
export interface AZModel {
  ZoneID: number;
  Principal?: Principal;
  PolicyStore?: PolicyStore;
  Entities: Entities;
}

/**
 * AZRequest is the AZRequest object.
 */
export interface AZRequest {
  AZModel: AZModel;
  RequestID?: string;
  Subject?: Subject;
  Resource?: Resource;
  Action?: Action;
  Context?: Record<string, any>;
  Evaluations?: Evaluation[];
}

/**
 * Principal is the principal object.
 */
export interface Principal {
  Type?: string;
  ID?: string;
  Source?: string;
}

/**
 * Subject is the subject object.
 */
export interface Subject {
  Type?: string;
  ID?: string;
  Source?: string;
  Properties?: Record<string, any>;
}

/**
 * Resource is the resource object.
 */
export interface Resource {
  Type?: string;
  ID?: string;
  Properties?: Record<string, any>;
}

/**
 * Action is the action object.
 */
export interface Action {
  Name?: string;
  Properties?: Record<string, any>;
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
  ReasonAdmin?: ReasonResponse;
  ReasonUser?: ReasonResponse;
}

/**
 * EvaluationResponse represents the result of the evaluation process.
 */
export interface EvaluationResponse {
  RequestID?: string;
  Decision?: boolean;
  Context?: ContextResponse;
}

/**
 * AZResponse represents the outcome of the authorization decision.
 */
export interface AZResponse {
  RequestID?: string;
  Decision: boolean;
  Context?: ContextResponse;
  Evaluations?: EvaluationResponse[];
}
