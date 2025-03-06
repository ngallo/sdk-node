import * as pb from "./generated/google/protobuf/struct";
import * as pdpGRPC from "./generated/proto/v1/pdp";
import {
  PolicyStore,
  Entities,
  Evaluation,
  AZModel,
  AZRequest,
  Principal,
  Subject,
  Resource,
  Action,
  ReasonResponse,
  ContextResponse,
  EvaluationResponse,
  AZResponse,
} from "../../../../../az/azreq/model";

// Request Mappers

/**
 * Maps the client PolicyStore to the gRPC PolicyStore.
 */
export function mapPolicyStoreToGrpcPolicyStore(
  policyStore: PolicyStore
): pdpGRPC.policydecisionpoint.PolicyStore | null {
  if (!policyStore) return null;

  return new pdpGRPC.policydecisionpoint.PolicyStore({
    Kind: policyStore.Kind,
    ID: policyStore.ID,
  });
}

/**
 * Maps the client Principal to the gRPC Principal.
 */
export function mapPrincipalToGrpcPrincipal(
  principal: Principal
): pdpGRPC.policydecisionpoint.Principal | null {
  if (!principal) return null;

  const grpcPrincipal = new pdpGRPC.policydecisionpoint.Principal({
    Type: principal.Type,
    ID: principal.ID,
  });
  if (principal.Source) grpcPrincipal.Source = principal.Source;
  return grpcPrincipal;
}

/**
 * Maps the client Entities to the gRPC Entities.
 */
export function mapEntitiesToGrpcEntities(
  entities: Entities
): pdpGRPC.policydecisionpoint.Entities | null {
  if (!entities) return null;

  const grpcEntities = new pdpGRPC.policydecisionpoint.Entities({
    Schema: entities.Schema,
  });

  if (entities.Items) {
    grpcEntities.Items = entities.Items.map((item) =>
      pb.google.protobuf.Struct.fromObject(item)
    );
  }
  return grpcEntities;
}

/**
 * Maps the client Subject to the gRPC Subject.
 */
export function mapSubjectToGrpcSubject(
  subject: Subject
): pdpGRPC.policydecisionpoint.Subject | null {
  if (!subject) return null;

  const grpcSubject = new pdpGRPC.policydecisionpoint.Subject({
    Type: subject.Type,
    ID: subject.ID,
  });

  if (subject.Source) grpcSubject.Source = subject.Source;
  if (subject.Properties) {
    grpcSubject.Properties = pb.google.protobuf.Struct.fromObject(
      subject.Properties
    );
  }
  return grpcSubject;
}

/**
 * Maps the client Resource to the gRPC Resource.
 */
export function mapResourceToGrpcResource(
  resource: Resource
): pdpGRPC.policydecisionpoint.Resource | null {
  if (!resource) return null;

  const grpcResource = new pdpGRPC.policydecisionpoint.Resource({
    Type: resource.Type,
    ID: resource.ID,
  });

  if (resource.Properties) {
    grpcResource.Properties = pb.google.protobuf.Struct.fromObject(
      resource.Properties
    );
  }

  return grpcResource;
}

/**
 * Maps the client Action to the gRPC Action.
 */
export function mapActionToGrpcAction(
  action: Action
): pdpGRPC.policydecisionpoint.Action | null {
  if (!action) return null;

  const grpcAction = new pdpGRPC.policydecisionpoint.Action({
    Name: action.Name,
  });

  if (action.Properties) {
    grpcAction.Properties = pb.google.protobuf.Struct.fromObject(
      action.Properties
    );
  }

  return grpcAction;
}

/**
 * Maps the client Evaluation to the gRPC EvaluationRequest.
 */
export function mapEvaluationToGrpcEvaluationRequest(
  evaluation: Evaluation
): pdpGRPC.policydecisionpoint.EvaluationRequest | null {
  if (!evaluation) return null;

  const grpcEvaluation = new pdpGRPC.policydecisionpoint.EvaluationRequest({
    RequestID: evaluation.RequestID,
  });

  if (evaluation.Subject) {
    grpcEvaluation.Subject = mapSubjectToGrpcSubject(evaluation.Subject)!;
  }

  if (evaluation.Resource) {
    grpcEvaluation.Resource = mapResourceToGrpcResource(evaluation.Resource)!;
  }

  if (evaluation.Action) {
    grpcEvaluation.Action = mapActionToGrpcAction(evaluation.Action)!;
  }

  if (evaluation.Context) {
    grpcEvaluation.Context = pb.google.protobuf.Struct.fromObject(
      evaluation.Context
    );
  }

  return grpcEvaluation;
}

/**
 * Maps the client AZModel to the gRPC AuthorizationModelRequest.
 */
export function mapAuthZModelToGrpcAuthorizationModelRequest(
  azModel: AZModel
): pdpGRPC.policydecisionpoint.AuthorizationModelRequest | null {
  if (!azModel) return null;

  const grpcModel = new pdpGRPC.policydecisionpoint.AuthorizationModelRequest({
    ZoneID: azModel.ZoneID,
  });

  if (azModel.PolicyStore) {
    grpcModel.PolicyStore = mapPolicyStoreToGrpcPolicyStore(
      azModel.PolicyStore
    )!;
  }

  if (azModel.Principal) {
    grpcModel.Principal = mapPrincipalToGrpcPrincipal(azModel.Principal)!;
  }

  if (azModel.Entities) {
    grpcModel.Entities = mapEntitiesToGrpcEntities(azModel.Entities)!;
  }

  return grpcModel;
}

/**
 * Maps the client AZRequest to the gRPC AuthorizationCheckRequest.
 */
export function mapAZRequestToGrpcAuthorizationCheckRequest(
  azRequest: AZRequest
): pdpGRPC.policydecisionpoint.AuthorizationCheckRequest {
  const grpcRequest = new pdpGRPC.policydecisionpoint.AuthorizationCheckRequest(
    {
      RequestID: azRequest.RequestID,
    }
  );

  if (azRequest.AZModel) {
    grpcRequest.AuthorizationModel =
      mapAuthZModelToGrpcAuthorizationModelRequest(azRequest.AZModel)!;
  }

  if (azRequest.Subject) {
    grpcRequest.Subject = mapSubjectToGrpcSubject(azRequest.Subject)!;
  }

  if (azRequest.Resource) {
    grpcRequest.Resource = mapResourceToGrpcResource(azRequest.Resource)!;
  }

  if (azRequest.Action) {
    grpcRequest.Action = mapActionToGrpcAction(azRequest.Action)!;
  }

  if (azRequest.Context) {
    grpcRequest.Context = pb.google.protobuf.Struct.fromObject(
      azRequest.Context
    );
  }

  if (azRequest.Evaluations) {
    grpcRequest.Evaluations = azRequest.Evaluations.map(
      (evaluation) => mapEvaluationToGrpcEvaluationRequest(evaluation)!
    );
  }

  return grpcRequest;
}

// Response Mappers

/**
 * Maps the gRPC ReasonResponse to the client ReasonResponse.
 */
export function mapGrpcReasonResponseToReasonResponse(
  reasonResponse: pdpGRPC.policydecisionpoint.ReasonResponse
): ReasonResponse | null {
  if (!reasonResponse) return null;

  return {
    Code: reasonResponse.Code,
    Message: reasonResponse.Message,
  };
}

/**
 * Maps the gRPC ContextResponse to the client ContextResponse.
 */
export function mapGrpcContextResponseToContextResponse(
  contextResponse: pdpGRPC.policydecisionpoint.ContextResponse
): ContextResponse | null {
  if (!contextResponse) return null;
  const clientContext: ContextResponse = {
    ID: contextResponse.ID,
  };

  if (contextResponse.ReasonAdmin) {
    clientContext.ReasonAdmin = mapGrpcReasonResponseToReasonResponse(
      contextResponse.ReasonAdmin
    )!;
  }

  if (contextResponse.ReasonUser) {
    clientContext.ReasonUser = mapGrpcReasonResponseToReasonResponse(
      contextResponse.ReasonUser
    )!;
  }

  return clientContext;
}

/**
 * Maps the gRPC EvaluationResponse to the client EvaluationResponse.
 */
export function mapGrpcEvaluationResponseToEvaluationResponse(
  evaluationResponse: pdpGRPC.policydecisionpoint.EvaluationResponse
): EvaluationResponse | null {
  if (!evaluationResponse) return null;

  const clientEvaluation: EvaluationResponse = {
    Decision: evaluationResponse.Decision,
    RequestID: evaluationResponse.RequestID || "",
  };

  if (evaluationResponse.Context) {
    clientEvaluation.Context = mapGrpcContextResponseToContextResponse(
      evaluationResponse.Context
    )!;
  }

  return clientEvaluation;
}

/**
 * Maps the gRPC AuthorizationCheckResponse to the client AZResponse.
 */
export function mapGrpcAuthorizationCheckResponseToAZResponse(
  response: pdpGRPC.policydecisionpoint.AuthorizationCheckResponse
): AZResponse {
  const clientResponse: AZResponse = {
    Decision: response.Decision,
    RequestID: response.RequestID || "",
  };

  if (response.Context) {
    clientResponse.Context = mapGrpcContextResponseToContextResponse(
      response.Context
    )!;
  }

  if (response.Evaluations) {
    clientResponse.Evaluations = response.Evaluations.map(
      (evaluation) => mapGrpcEvaluationResponseToEvaluationResponse(evaluation)!
    );
  }

  return clientResponse;
}
