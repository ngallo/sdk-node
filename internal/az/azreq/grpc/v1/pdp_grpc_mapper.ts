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
): pdpGRPC.PolicyStore | null {
  if (!policyStore) return null;

  return pdpGRPC.PolicyStore.create({
    kind: policyStore.Kind,
    iD: policyStore.ID,
  });
}

/**
 * Maps the client Principal to the gRPC Principal.
 */
export function mapPrincipalToGrpcPrincipal(
  principal: Principal
): pdpGRPC.Principal | null {
  if (!principal) return null;

  return pdpGRPC.Principal.create({
    type: principal.Type,
    iD: principal.ID,
    source: principal.Source,
  });
}

/**
 * Maps the client Entities to the gRPC Entities.
 */
export function mapEntitiesToGrpcEntities(
  entities: Entities
): pdpGRPC.Entities | null {
  if (!entities) return null;

  return pdpGRPC.Entities.create({
    schema: entities.Schema,
    items: entities.Items?.map((item) => pb.Struct.fromJson(item)),
  });
}

/**
 * Maps the client Subject to the gRPC Subject.
 */
export function mapSubjectToGrpcSubject(
  subject: Subject
): pdpGRPC.Subject | null {
  if (!subject) return null;

  return pdpGRPC.Subject.create({
    type: subject.Type,
    iD: subject.ID,
    source: subject.Source,
    properties: subject.Properties
      ? pb.Struct.fromJson(subject.Properties)
      : undefined,
  });
}

/**
 * Maps the client Resource to the gRPC Resource.
 */
export function mapResourceToGrpcResource(
  resource: Resource
): pdpGRPC.Resource | null {
  if (!resource) return null;

  return pdpGRPC.Resource.create({
    type: resource.Type,
    iD: resource.ID,
    properties: resource.Properties
      ? pb.Struct.fromJson(resource.Properties)
      : undefined,
  });
}

/**
 * Maps the client Action to the gRPC Action.
 */
export function mapActionToGrpcAction(action: Action): pdpGRPC.Action | null {
  if (!action) return null;

  return pdpGRPC.Action.create({
    name: action.Name,
    properties: action.Properties
      ? pb.Struct.fromJson(action.Properties)
      : undefined,
  });
}

/**
 * Maps the client Evaluation to the gRPC EvaluationRequest.
 */
export function mapEvaluationToGrpcEvaluationRequest(
  evaluation: Evaluation
): pdpGRPC.EvaluationRequest | null {
  if (!evaluation) return null;

  return pdpGRPC.EvaluationRequest.create({
    requestID: evaluation.RequestID,
    subject: evaluation.Subject
      ? mapSubjectToGrpcSubject(evaluation.Subject) ?? undefined
      : undefined,
    resource: evaluation.Resource
      ? mapResourceToGrpcResource(evaluation.Resource) ?? undefined
      : undefined,
    action: evaluation.Action
      ? mapActionToGrpcAction(evaluation.Action) ?? undefined
      : undefined,
    context: evaluation.Context
      ? pb.Struct.fromJson(evaluation.Context)
      : undefined,
  });
}

/**
 * Maps the client AZModel to the gRPC AuthorizationModelRequest.
 */
export function mapAuthZModelToGrpcAuthorizationModelRequest(
  azModel: AZModel
): pdpGRPC.AuthorizationModelRequest | null {
  if (!azModel) return null;

  return pdpGRPC.AuthorizationModelRequest.create({
    zoneID: BigInt(azModel.ZoneID),
    policyStore: azModel.PolicyStore
      ? mapPolicyStoreToGrpcPolicyStore(azModel.PolicyStore) ?? undefined
      : undefined,
    principal: azModel.Principal
      ? mapPrincipalToGrpcPrincipal(azModel.Principal) ?? undefined
      : undefined,
    entities: azModel.Entities
      ? mapEntitiesToGrpcEntities(azModel.Entities) ?? undefined
      : undefined,
  });
}

/**
 * Maps the client AZRequest to the gRPC AuthorizationCheckRequest.
 */
export function mapAZRequestToGrpcAuthorizationCheckRequest(
  azRequest: AZRequest
): pdpGRPC.AuthorizationCheckRequest {
  return pdpGRPC.AuthorizationCheckRequest.create({
    requestID: azRequest.RequestID,
    authorizationModel: azRequest.AZModel
      ? mapAuthZModelToGrpcAuthorizationModelRequest(azRequest.AZModel) ??
        undefined
      : undefined,
    subject: azRequest.Subject
      ? mapSubjectToGrpcSubject(azRequest.Subject) ?? undefined
      : undefined,
    resource: azRequest.Resource
      ? mapResourceToGrpcResource(azRequest.Resource) ?? undefined
      : undefined,
    action: azRequest.Action
      ? mapActionToGrpcAction(azRequest.Action) ?? undefined
      : undefined,
    context: azRequest.Context
      ? pb.Struct.fromJson(azRequest.Context)
      : undefined,
    evaluations: azRequest.Evaluations?.map(
      (evaluation) => mapEvaluationToGrpcEvaluationRequest(evaluation)!
    ),
  });
}

// Response Mappers

/**
 * Maps the gRPC ReasonResponse to the client ReasonResponse.
 */
export function mapGrpcReasonResponseToReasonResponse(
  reasonResponse: pdpGRPC.ReasonResponse
): ReasonResponse | null {
  if (!reasonResponse) return null;

  return {
    Code: reasonResponse.code,
    Message: reasonResponse.message,
  };
}

/**
 * Maps the gRPC ContextResponse to the client ContextResponse.
 */
export function mapGrpcContextResponseToContextResponse(
  contextResponse: pdpGRPC.ContextResponse
): ContextResponse | null {
  if (!contextResponse) return null;

  return {
    ID: contextResponse.iD,
    ReasonAdmin: contextResponse.reasonAdmin
      ? mapGrpcReasonResponseToReasonResponse(contextResponse.reasonAdmin)
      : undefined,
    ReasonUser: contextResponse.reasonUser
      ? mapGrpcReasonResponseToReasonResponse(contextResponse.reasonUser)
      : null,
  };
}

/**
 * Maps the gRPC EvaluationResponse to the client EvaluationResponse.
 */
export function mapGrpcEvaluationResponseToEvaluationResponse(
  evaluationResponse: pdpGRPC.EvaluationResponse
): EvaluationResponse | null {
  if (!evaluationResponse) return null;

  return {
    Decision: evaluationResponse.decision,
    RequestID: evaluationResponse.requestID || "",
    Context: evaluationResponse.context
      ? mapGrpcContextResponseToContextResponse(evaluationResponse.context)
      : undefined,
  };
}

/**
 * Maps the gRPC AuthorizationCheckResponse to the client AZResponse.
 */
export function mapGrpcAuthorizationCheckResponseToAZResponse(
  response: pdpGRPC.AuthorizationCheckResponse
): AZResponse {
  return {
    Decision: response.decision,
    RequestID: response.requestID || "",
    Context: response.context
      ? mapGrpcContextResponseToContextResponse(response.context)
      : undefined,
    Evaluations: response.evaluations?.map(
      (evaluation) => mapGrpcEvaluationResponseToEvaluationResponse(evaluation)!
    ),
  };
}
