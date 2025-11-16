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

import { Principal, IdentityType } from "./model";
import _ from "lodash";

/**
 * Default principal type.
 */
const PrincipalDefaultType = "user";

/**
 * PrincipalBuilder is the builder for the Principal object.
 */
export class PrincipalBuilder {
  private principal: Principal;

  /**
   * Creates a new PrincipalBuilder instance.
   * @param id - The ID of the principal.
   */
  constructor(id: string) {
    this.principal = {
      type: PrincipalDefaultType,
      id: id,
    };
  }

    /**
     * Sets the type of the principal to UserType.
     * @returns The PrincipalBuilder instance for method chaining.
     */
    withUserType(): PrincipalBuilder {
      this.withType(IdentityType.UserType);
      return this;
    }
  
    /**
     * Sets the type of the principal to WorkloadType.
     * @returns The PrincipalBuilder instance for method chaining.
     */
    withWorkloadType(): PrincipalBuilder {
      this.withType(IdentityType.WorkloadType);
      return this;
    }
  
      /**
     * Sets the type of the principal to AttributeType.
     * @returns The PrincipalBuilder instance for method chaining.
     */
    withAttribute(): PrincipalBuilder {
      this.withType(IdentityType.AttributeType);
      return this;
    }

  /**
   * Sets the kind of the principal.
   * @param kind - The kind of the principal.
   * @returns The PrincipalBuilder instance for method chaining.
   */
  withType(type: string): PrincipalBuilder {
    this.principal.type = type;
    return this;
  }

  /**
   * Sets the source of the principal.
   * @param source - The source of the principal.
   * @returns The PrincipalBuilder instance for method chaining.
   */
  withSource(source: string): PrincipalBuilder {
    this.principal.source = source;
    return this;
  }

  /**
   * Builds the Principal object.
   * @returns The constructed Principal object.
   */
  build(): Principal {
    // Return a deep copy of the principal to avoid mutation issues
    return _.cloneDeep(this.principal);
  }
}
