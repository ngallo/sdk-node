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

import { Subject, IdentityType } from "./model";
import _ from "lodash";

/**
 * Default subject kind.
 */
const SubjectDefaultKind = "user";

/**
 * SubjectBuilder is the builder for the Subject object.
 */
export class SubjectBuilder {
  private subject: Subject;

  /**
   * Creates a new SubjectBuilder instance.
   * @param id - The ID of the subject.
   */
  constructor(id: string) {
    this.subject = {
      type: SubjectDefaultKind,
      id: id,
    };
  }

  /**
   * Sets the kind of the subject.
   * @param kind - The kind of the subject.
   * @returns The SubjectBuilder instance for method chaining.
   */
  withType(kind: string): SubjectBuilder {
    this.subject.type = kind;
    return this;
  }

  /**
   * Sets the source of the subject.
   * @param source - The source of the subject.
   * @returns The SubjectBuilder instance for method chaining.
   */
  withSource(source: string): SubjectBuilder {
    this.subject.source = source;
    return this;
  }

  /**
   * Sets a property of the subject.
   * @param key - The property key.
   * @param value - The property value.
   * @returns The SubjectBuilder instance for method chaining.
   */
  withProperty(key: string, value: any): SubjectBuilder {
    if (!this.subject.properties) {
      this.subject.properties = {};
    }
    this.subject.properties[key] = value;
    return this;
  }

  /**
   * Sets the type of the subject to UserType.
   * @returns The SubjectBuilder instance for method chaining.
   */
  withUserType(): SubjectBuilder {
    this.withType(IdentityType.UserType);
    return this;
  }

  /**
   * Sets the type of the subject to WorkloadType.
   * @returns The SubjectBuilder instance for method chaining.
   */
  withWorkloadType(): SubjectBuilder {
    this.withType(IdentityType.WorkloadType);
    return this;
  }

    /**
   * Sets the type of the subject to AttributeType.
   * @returns The SubjectBuilder instance for method chaining.
   */
  withAttribute(): SubjectBuilder {
    this.withType(IdentityType.AttributeType);
    return this;
  }

  /**
   * Sets the type of the subject.
   * @param subType - The type of the subject.
   * @returns The SubjectBuilder instance for method chaining.
   */
  withType(subType: string): SubjectBuilder {
    this.subject.type = subType;
    return this;
  }

  /**
   * Builds the Subject object.
   * @returns The constructed Subject object.
   */
  build(): Subject {
    return _.cloneDeep(this.subject);
  }
}
