import * as grpc from "@grpc/grpc-js";
import * as pdpGRPC from "./generated/proto/v1/pdp";
import {
  mapAZRequestToGrpcAuthorizationCheckRequest,
  mapGrpcAuthorizationCheckResponseToAZResponse,
} from "./pdp_grpc_mapper";
import { AZRequest, AZResponse } from "../../../../../az/azreq/model";

/**
 * PDPClient is a client for interacting with the Policy Decision Point (PDP) service.
 */
export class PDPClient {
  private client: pdpGRPC.policydecisionpoint.V1PDPServiceClient;

  /**
   * Creates a new PDPClient.
   * @param endpoint - The gRPC server endpoint (e.g., "localhost:50051").
   * @param credentials - Optional gRPC credentials (defaults to insecure credentials).
   */
  constructor(
    endpoint: string,
    credentials: grpc.ChannelCredentials = grpc.credentials.createInsecure()
  ) {
    this.client = new pdpGRPC.policydecisionpoint.V1PDPServiceClient(
      endpoint,
      credentials
    );
  }

  /**
   * Checks the authorization request with the PDP service.
   * @param request - The authorization request.
   * @returns A promise that resolves to the authorization response.
   */
  authorizationCheck(request: AZRequest): Promise<AZResponse> {
    return new Promise((resolve, reject) => {
      if (!request) {
        reject(
          new Error("Invalid request: request cannot be null or undefined")
        );
        return;
      }

      // Map the client request to the gRPC request
      const grpcRequest = mapAZRequestToGrpcAuthorizationCheckRequest(request);

      // Make the gRPC call
      this.client.AuthorizationCheck(
        grpcRequest,
        (
          err: grpc.ServiceError | null,
          response?: pdpGRPC.policydecisionpoint.AuthorizationCheckResponse
        ) => {
          if (err) {
            reject(new Error(`gRPC call failed: ${err.message}`));
            return;
          }

          if (response) {
            // Map the gRPC response to the client response
            const clientResponse =
              mapGrpcAuthorizationCheckResponseToAZResponse(response);
            resolve(clientResponse);
          }
        }
      );
    });
  }

  /**
   * Closes the gRPC client connection.
   */
  close(): void {
    this.client.close();
  }
}
