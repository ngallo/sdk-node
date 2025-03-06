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

import { AZRequest, AZResponse } from "./az/azreq/model";
import { PDPClient } from "./internal/az/azreq/grpc/v1/pdp_client";

/**
 * Represents the configuration for the AZClient.
 */
interface AZConfig {
  pdpEndpoint: {
    endpoint: string;
    port: number;
  };
}

/**
 * Represents an option function to configure the AZClient.
 */
type AZOption = (config: AZConfig) => void;

/**
 * AZClient is the client to interact with the authorization server.
 */
export class AZClient {
  private azConfig: AZConfig;

  /**
   * Creates a new AZClient.
   * @param opts - Optional configuration options.
   */
  constructor(...opts: AZOption[]) {
    this.azConfig = {
      pdpEndpoint: {
        endpoint: "localhost",
        port: 9094,
      },
    };

    // Apply options
    opts.forEach((opt) => opt(this.azConfig));
  }

  /**
   * Checks the input authorization request with the authorization server.
   * @param req - The authorization request.
   * @returns A tuple containing:
   *   - A boolean indicating the decision (true if authorized, false otherwise).
   *   - The full authorization response.
   *   - An error, if any.
   */
  async check(req: AZRequest): Promise<{
    decision: boolean;
    response: AZResponse | null;
    error: Error | null;
  }> {
    const target = `${this.azConfig.pdpEndpoint.endpoint}:${this.azConfig.pdpEndpoint.port}`;

    // Create a PDPClient instance
    const pdpClient = new PDPClient(target);

    try {
      const response = await pdpClient.authorizationCheck(req);
      return { decision: response.Decision, response, error: null };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));

      return { decision: false, response: null, error };
    }
  }
}

/**
 * Creates a new AZClient with the provided options.
 * @param opts - Optional configuration options.
 * @returns A new AZClient instance.
 */
export function newAZClient(...opts: AZOption[]): AZClient {
  return new AZClient(...opts);
}
