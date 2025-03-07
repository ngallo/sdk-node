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
    kind: policyStore.kind,
    iD: policyStore.id,
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
    type: principal.type,
    iD: principal.id,
    source: principal.source,
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
    schema: entities.schema,
    items: entities.items?.map((item) => pb.Struct.fromJson(item)),
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
    type: subject.type,
    iD: subject.id,
    source: subject.source,
    properties: subject.properties
      ? pb.Struct.fromJson(subject.properties)
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
    type: resource.type,
    iD: resource.id,
    properties: resource.properties
      ? pb.Struct.fromJson(resource.properties)
      : undefined,
  });
}

/**
 * Maps the client Action to the gRPC Action.
 */
export function mapActionToGrpcAction(action: Action): pdpGRPC.Action | null {
  if (!action) return null;

  return pdpGRPC.Action.create({
    name: action.name,
    properties: action.properties
      ? pb.Struct.fromJson(action.properties)
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
    requestID: evaluation.request_id,
    subject: evaluation.subject
      ? mapSubjectToGrpcSubject(evaluation.subject) ?? undefined
      : undefined,
    resource: evaluation.resource
      ? mapResourceToGrpcResource(evaluation.resource) ?? undefined
      : undefined,
    action: evaluation.action
      ? mapActionToGrpcAction(evaluation.action) ?? undefined
      : undefined,
    context: evaluation.context
      ? pb.Struct.fromJson(evaluation.context)
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
    zoneID: BigInt(azModel.zone_id),
    policyStore: azModel.policy_store
      ? mapPolicyStoreToGrpcPolicyStore(azModel.policy_store) ?? undefined
      : undefined,
    principal: azModel.principal
      ? mapPrincipalToGrpcPrincipal(azModel.principal) ?? undefined
      : undefined,
    entities: azModel.entities
      ? mapEntitiesToGrpcEntities(azModel.entities) ?? undefined
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
    requestID: azRequest.request_id,
    authorizationModel: azRequest.authorization_model
      ? mapAuthZModelToGrpcAuthorizationModelRequest(
          azRequest.authorization_model
        ) ?? undefined
      : undefined,
    subject: azRequest.subject
      ? mapSubjectToGrpcSubject(azRequest.subject) ?? undefined
      : undefined,
    resource: azRequest.resource
      ? mapResourceToGrpcResource(azRequest.resource) ?? undefined
      : undefined,
    action: azRequest.action
      ? mapActionToGrpcAction(azRequest.action) ?? undefined
      : undefined,
    context: azRequest.context
      ? pb.Struct.fromJson(azRequest.context)
      : undefined,
    evaluations: azRequest.evaluations?.map(
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
