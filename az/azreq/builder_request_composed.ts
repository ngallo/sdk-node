// Copyright 2025 Nitro Agility S.r.l.
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

import {
  AZRequest,
  Evaluation,
  Principal,
  Subject,
  Resource,
  Action,
} from "./model";

/**
 * AZRequestBuilder is the builder for the AZRequest object.
 */
export class AZRequestBuilder {
  private azRequest: AZRequest;

  /**
   * Creates a new AZRequestBuilder instance.
   * @param zoneID - The zone ID.
   * @param ledgerID - The ledger ID.
   */
  constructor(zoneID: number, ledgerID: string) {
    this.azRequest = {
      authorization_model: {
        zone_id: zoneID,
        policy_store: {
          kind: "ledger",
          id: ledgerID,
        },
        entities: {
          schema: "",
          items: [],
        },
      },
      evaluations: [],
    };
  }

  /**
   * Sets the principal of the AZRequest.
   * @param principal - The principal object.
   * @returns The AZRequestBuilder instance for method chaining.
   */
  withPrincipal(principal?: Principal): AZRequestBuilder {
    this.azRequest.authorization_model.principal = principal;
    return this;
  }

  /**
   * Sets the request ID of the AZRequest.
   * @param requestID - The request ID.
   * @returns The AZRequestBuilder instance for method chaining.
   */
  withRequestID(requestID?: string): AZRequestBuilder {
    this.azRequest.request_id = requestID;
    return this;
  }

  /**
   * Sets the subject of the AZRequest.
   * @param subject - The subject object.
   * @returns The AZRequestBuilder instance for method chaining.
   */
  withSubject(subject: Subject): AZRequestBuilder {
    this.azRequest.subject = subject;
    return this;
  }

  /**
   * Sets the resource of the AZRequest.
   * @param resource - The resource object.
   * @returns The AZRequestBuilder instance for method chaining.
   */
  withResource(resource: Resource): AZRequestBuilder {
    this.azRequest.resource = resource;
    return this;
  }

  /**
   * Sets the action of the AZRequest.
   * @param action - The action object.
   * @returns The AZRequestBuilder instance for method chaining.
   */
  withAction(action: Action): AZRequestBuilder {
    this.azRequest.action = action;
    return this;
  }

  /**
   * Sets the context of the AZRequest.
   * @param context - The context object (a map of key-value pairs).
   * @returns The AZRequestBuilder instance for method chaining.
   */
  withContext(context: Record<string, any>): AZRequestBuilder {
    this.azRequest.context = context;
    return this;
  }

  /**
   * Sets the entities map to the AZRequest.
   * @param schema - The schema of the entities.
   * @param entities - The entities map.
   * @returns The AZRequestBuilder instance for method chaining.
   */
  withEntitiesMap(
    schema: string,
    entities: Record<string, any>
  ): AZRequestBuilder {
    this.azRequest.authorization_model.entities.schema = schema;
    this.azRequest.authorization_model.entities.items = [entities];
    return this;
  }

  /**
   * Sets the entities items to the AZRequest.
   * @param schema - The schema of the entities.
   * @param entities - The entities items (array of maps).
   * @returns The AZRequestBuilder instance for method chaining.
   */
  withEntitiesItems(
    schema: string,
    entities?: Record<string, any>[]
  ): AZRequestBuilder {
    this.azRequest.authorization_model.entities.schema = schema;
    this.azRequest.authorization_model.entities.items = entities;

    if (!this.azRequest.authorization_model.entities.items) {
      this.azRequest.authorization_model.entities.items = [];
    }

    return this;
  }

  /**
   * Adds an evaluation to the AZRequest.
   * @param evaluation - The evaluation object.
   * @returns The AZRequestBuilder instance for method chaining.
   */
  withEvaluation(evaluation: Evaluation): AZRequestBuilder {
    this.azRequest.evaluations?.push(evaluation);
    return this;
  }

  /**
   * Builds the AZRequest object.
   * @returns The constructed AZRequest object.
   */
  build(): AZRequest {
    return this.azRequest;
  }
}
