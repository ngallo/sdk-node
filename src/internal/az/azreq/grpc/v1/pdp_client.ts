import { V1PDPServiceClient } from "./generated/proto/v1/pdp.client";
import {
  AuthorizationCheckRequest,
  AuthorizationCheckResponse,
} from "./generated/proto/v1/pdp";
import {
  mapAZRequestToGrpcAuthorizationCheckRequest,
  mapGrpcAuthorizationCheckResponseToAZResponse,
} from "./pdp_grpc_mapper";
import { AZRequest, AZResponse } from "../../../../../az/azreq/model";
import { RpcError } from "@protobuf-ts/runtime-rpc";
import { GrpcTransport } from "@protobuf-ts/grpc-transport";
import { ChannelCredentials } from "@grpc/grpc-js";

/**
 * PDPClient is a client for interacting with the Policy Decision Point (PDP) service.
 */
export class PDPClient {
  private client: V1PDPServiceClient;

  /**
   * Creates a new PDPClient.
   * @param endpoint - The gRPC server endpoint.
   */
  constructor(endpoint: string) {
    const transport = new GrpcTransport({
      host: endpoint,
      channelCredentials: ChannelCredentials.createInsecure(),
    });

    this.client = new V1PDPServiceClient(transport);
  }

  /**
   * Checks the authorization request with the PDP service.
   * @param request - The authorization request.
   * @returns A promise that resolves to the authorization response.
   */
  async authorizationCheck(request: AZRequest): Promise<AZResponse> {
    if (!request) {
      throw new Error("Invalid request: request cannot be null or undefined");
    }

    // Map the client request to the gRPC request
    const grpcRequest: AuthorizationCheckRequest =
      mapAZRequestToGrpcAuthorizationCheckRequest(request);

    try {
      // Make the gRPC call
      const response: AuthorizationCheckResponse =
        await this.client.authorizationCheck(grpcRequest).response;
      return mapGrpcAuthorizationCheckResponseToAZResponse(response);
    } catch (err) {
      if (err instanceof RpcError) {
        throw new Error(`gRPC call failed: ${err.message}`);
      }
      throw err;
    }
  }
}
