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

import { Resource } from "./model";
import _ from "lodash";

/**
 * ResourceBuilder is the builder for the Resource object.
 */
export class ResourceBuilder {
  private resource: Resource;

  /**
   * Creates a new ResourceBuilder instance.
   * @param kind - The kind (type) of the resource.
   */
  constructor(kind: string) {
    this.resource = {
      type: kind,
    };
  }

  /**
   * Sets the ID of the resource.
   * @param id - The ID of the resource.
   * @returns The ResourceBuilder instance for method chaining.
   */
  withID(id: string): ResourceBuilder {
    this.resource.id = id;
    return this;
  }

  /**
   * Sets a property of the resource.
   * @param key - The property key.
   * @param value - The property value.
   * @returns The ResourceBuilder instance for method chaining.
   */
  withProperty(key: string, value: any): ResourceBuilder {
    if (!this.resource.properties) {
      this.resource.properties = {};
    }

    this.resource.properties[key] = value;
    return this;
  }

  /**
   * Builds the Resource object.
   * @returns The constructed Resource object.
   */
  build(): Resource {
    return _.cloneDeep(this.resource);
  }
}
