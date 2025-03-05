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

import { grpc } from "@improbable-eng/grpc-web";
import { AZRequest, AZResponse } from "./azreq"; // Adjust the import path as needed
import { PDPClient } from "./pdp_grpc_web_pb"; // Generated gRPC-Web client
import {
  AuthorizationCheckRequest,
  AuthorizationCheckResponse,
} from "./pdp_pb"; // Generated Protocol Buffers messages
import { AZConfig, AZOption } from "./azconfig"; // Import AZConfig and AZOption from azconfig.ts

/**
 * Represents the client to interact with the authorization server.
 */
class AZClient {
  private azConfig: AZConfig;

  /**
   * Creates a new authorization client.
   * @param opts - Optional configuration options for the client.
   */
  constructor(opts: AZOption[] = []) {
    this.azConfig = {
      pdpEndpoint: {
        endpoint: "localhost",
        port: 9094,
      },
    };

    // Apply configuration options
    opts.forEach((opt) => opt(this.azConfig));
  }

  /**
   * Checks the input authorization request with the authorization server.
   * @param req - The authorization request to check.
   * @returns A tuple containing the decision, response, and error (if any).
   */
  async Check(
    req: AZRequest
  ): Promise<[boolean, AZResponse | null, Error | null]> {
    const target = `${this.azConfig.pdpEndpoint.endpoint}:${this.azConfig.pdpEndpoint.port}`;

    // Create a gRPC-Web client
    const client = new PDPClient(target);

    // Convert the AZRequest to a gRPC request
    const request = new AuthorizationCheckRequest();
    // Populate the request with data from req (you'll need to map fields accordingly)
    // Example: request.setZoneId(req.zoneId);

    try {
      // Make the gRPC-Web call
      const response = await new Promise<AuthorizationCheckResponse>(
        (resolve, reject) => {
          client.authorizationCheck(request, {}, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        }
      );

      // Convert the gRPC response to AZResponse
      const azResponse: AZResponse = {
        decision: response.getDecision(),
        // Map other fields as needed
      };

      return [azResponse.decision, azResponse, null];
    } catch (err) {
      return [false, null, err as Error];
    }
  }
}

export { AZClient };
