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

import { Principal } from "./model";
import _ from "lodash";

/**
 * Default principal kind.
 */
const PrincipalDefaultKind = "user";

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
      Type: PrincipalDefaultKind,
      ID: id,
    };
  }

  /**
   * Sets the kind of the principal.
   * @param kind - The kind of the principal.
   * @returns The PrincipalBuilder instance for method chaining.
   */
  withKind(kind: string): PrincipalBuilder {
    this.principal.Type = kind;
    return this;
  }

  /**
   * Sets the source of the principal.
   * @param source - The source of the principal.
   * @returns The PrincipalBuilder instance for method chaining.
   */
  withSource(source: string): PrincipalBuilder {
    this.principal.Source = source;
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
