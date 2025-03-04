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

import _ from "lodash";

/**
 * ContextBuilder is the builder for the Context object.
 */
export class ContextBuilder {
  private context: Record<string, any>;

  /**
   * Creates a new ContextBuilder instance.
   */
  constructor() {}

  /**
   * Sets a property of the context.
   * @param key - The property key.
   * @param value - The property value.
   * @returns The ContextBuilder instance for method chaining.
   */
  withProperty(key: string, value: any): ContextBuilder {
    if (!this.context) {
      this.context = {};
    }

    this.context[key] = value;
    return this;
  }

  /**
   * Builds the Context object.
   * @returns The constructed Context object (a map of key-value pairs).
   */
  build(): Record<string, any> {
    // Deep copy the context to avoid mutation issues
    return _.cloneDeep(this.context);
  }
}
