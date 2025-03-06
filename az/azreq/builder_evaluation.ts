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

import { Action, Evaluation, Resource, Subject } from "./model";
import _ from "lodash";

/**
 * EvaluationBuilder is the builder for the Evaluation object.
 */
export class EvaluationBuilder {
  private azEvaluation: Evaluation;

  /**
   * Creates a new EvaluationBuilder instance.
   * @param subject - The subject of the evaluation.
   * @param resource - The resource of the evaluation.
   * @param action - The action of the evaluation.
   */
  constructor(subject: Subject, resource: Resource, action: Action) {
    this.azEvaluation = {
      subject: subject,
      resource: resource,
      action: action,
    };
  }

  /**
   * Sets the request ID of the evaluation.
   * @param requestID - The request ID.
   * @returns The EvaluationBuilder instance for method chaining.
   */
  withRequestID(requestID: string): EvaluationBuilder {
    this.azEvaluation.request_id = requestID;
    return this;
  }

  /**
   * Sets the context of the evaluation.
   * @param context - The context (a map of key-value pairs).
   * @returns The EvaluationBuilder instance for method chaining.
   */
  withContext(context: Record<string, any>): EvaluationBuilder {
    this.azEvaluation.context = context;
    return this;
  }

  /**
   * Builds the Evaluation object.
   * @returns The constructed Evaluation object.
   */
  build(): Evaluation {
    return _.cloneDeep(this.azEvaluation);
  }
}
