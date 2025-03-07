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

import { Action } from "./model";
import _ from "lodash";

/**
 * ActionBuilder is the builder for the Action object.
 */
export class ActionBuilder {
  private action: Action;

  /**
   * Creates a new ActionBuilder instance.
   * @param name - The name of the action.
   */
  constructor(name: string) {
    this.action = {
      name: name,
    };
  }

  /**
   * Sets a property of the action.
   * @param key - The property key.
   * @param value - The property value.
   * @returns The ActionBuilder instance for method chaining.
   */
  withProperty(key: string, value: any): this {
    if (!this.action.properties) {
      this.action.properties = {};
    }

    this.action.properties[key] = value;
    return this;
  }

  /**
   * Builds the Action object.
   * @returns The constructed Action object.
   */
  build(): Action {
    return _.cloneDeep(this.action);
  }
}
