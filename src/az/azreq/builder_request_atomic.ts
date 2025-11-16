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

import { AZRequestBuilder } from "./builder_request_composed";
import { SubjectBuilder } from "./builder_subject";
import { ResourceBuilder } from "./builder_resource";
import { ActionBuilder } from "./builder_action";
import { ContextBuilder } from "./builder_context";
import { Principal, AZRequest, ActorType } from "./model";

/**
 * AZAtomicRequestBuilder is the builder for the AZAtomicRequest object.
 */
export class AZAtomicRequestBuilder {
  private requestID?: string;
  private principal?: Principal;
  private azSubjectBuilder: SubjectBuilder;
  private azResourceBuilder: ResourceBuilder;
  private azActionBuilder: ActionBuilder;
  private azContextBuilder: ContextBuilder;
  private azRequestBuilder: AZRequestBuilder;

  /**
   * Creates a new AZAtomicRequestBuilder instance.
   * @param zoneID - The zone ID.
   * @param ledgerID - The ledger ID.
   * @param subjectID - The subject ID.
   * @param resourceKind - The resource kind.
   * @param actionName - The action name.
   */
  constructor(
    zoneID: number,
    ledgerID: string,
    subjectID: string,
    resourceKind: string,
    actionName: string
  ) {
    this.azRequestBuilder = new AZRequestBuilder(zoneID, ledgerID);
    this.azSubjectBuilder = new SubjectBuilder(subjectID);
    this.azResourceBuilder = new ResourceBuilder(resourceKind);
    this.azActionBuilder = new ActionBuilder(actionName);
    this.azContextBuilder = new ContextBuilder();
  }

  /**
   * Sets the entities map to the AZRequest.
   * @param schema - The schema of the entities.
   * @param entities - The entities map.
   * @returns The AZAtomicRequestBuilder instance for method chaining.
   */
  withEntitiesMap(
    schema: string,
    entities: Record<string, any>
  ): AZAtomicRequestBuilder {
    this.azRequestBuilder.withEntitiesMap(schema, entities);
    return this;
  }

  /**
   * Sets the entities items to the AZRequest.
   * @param schema - The schema of the entities.
   * @param entities - The entities items.
   * @returns The AZAtomicRequestBuilder instance for method chaining.
   */
  withEntitiesItems(
    schema: string,
    entities?: Record<string, any>[]
  ): AZAtomicRequestBuilder {
    this.azRequestBuilder.withEntitiesItems(schema, entities);
    return this;
  }

  /**
   * Sets the request ID of the AZRequest.
   * @param requestID - The request ID.
   * @returns The AZAtomicRequestBuilder instance for method chaining.
   */
  withRequestID(requestID: string): AZAtomicRequestBuilder {
    this.requestID = requestID;
    return this;
  }

  /**
   * Sets the principal of the AZRequest.
   * @param principal - The principal.
   * @returns The AZAtomicRequestBuilder instance for method chaining.
   */
  withPrincipal(principal: Principal): AZAtomicRequestBuilder {
    this.principal = principal;
    return this;
  }

  /**
   * Sets the kind of the subject for the AZRequest.
   * @param kind - The subject kind.
   * @returns The AZAtomicRequestBuilder instance for method chaining.
   */
  withSubjectKind(kind: string): AZAtomicRequestBuilder {
    this.azSubjectBuilder.withKind(kind);
    return this;
  }

  /**
   * Sets the source of the subject for the AZRequest.
   * @param source - The subject source.
   * @returns The AZAtomicRequestBuilder instance for method chaining.
   */
  withSubjectSource(source: string): AZAtomicRequestBuilder {
    this.azSubjectBuilder.withSource(source);
    return this;
  }

  /**
   * Sets a property of the subject for the AZRequest.
   * @param key - The property key.
   * @param value - The property value.
   * @returns The AZAtomicRequestBuilder instance for method chaining.
   */
  withSubjectProperty(key: string, value: any): AZAtomicRequestBuilder {
    this.azSubjectBuilder.withProperty(key, value);
    return this;
  }

  /**
   * Sets the ID of the resource for the AZRequest.
   * @param id - The resource ID.
   * @returns The AZAtomicRequestBuilder instance for method chaining.
   */
  withResourceID(id: string): AZAtomicRequestBuilder {
    this.azResourceBuilder.withID(id);
    return this;
  }

  /**
   * Sets a property of the resource for the AZRequest.
   * @param key - The property key.
   * @param value - The property value.
   * @returns The AZAtomicRequestBuilder instance for method chaining.
   */
  withResourceProperty(key: string, value: any): AZAtomicRequestBuilder {
    this.azResourceBuilder.withProperty(key, value);
    return this;
  }

  /**
   * Sets a property of the action for the AZRequest.
   * @param key - The property key.
   * @param value - The property value.
   * @returns The AZAtomicRequestBuilder instance for method chaining.
   */
  withActionProperty(key: string, value: any): AZAtomicRequestBuilder {
    this.azActionBuilder.withProperty(key, value);
    return this;
  }

  /**
   * Sets a property of the context for the AZRequest.
   * @param key - The property key.
   * @param value - The property value.
   * @returns The AZAtomicRequestBuilder instance for method chaining.
   */
  withContextProperty(key: string, value: any): AZAtomicRequestBuilder {
    this.azContextBuilder.withProperty(key, value);
    return this;
  }

  /**
   * Sets the type of the subject to UserType.
   * @returns The AZAtomicRequestBuilder instance for method chaining.
   */
  withSubjectUserType(): AZAtomicRequestBuilder {
    this.azSubjectBuilder.withKind(ActorType.UserType);
    return this;
  }

  /**
   * Sets the type of the subject to WorkloadType.
   * @returns The AZAtomicRequestBuilder instance for method chaining.
   */
  withSubjectWorkloadType(): AZAtomicRequestBuilder {
    this.azSubjectBuilder.withKind(ActorType.WorkloadType);
    return this;
  }

  /**
   * Sets the type of the subject.
   * @param kind - The type of the subject.
   * @returns The AZAtomicRequestBuilder instance for method chaining.
   */
  withSubjectType(kind: string): AZAtomicRequestBuilder {
    this.azSubjectBuilder.withKind(kind);
    return this;
  }

  /**
   * Builds the AZAtomicRequest object.
   * @returns The constructed AZRequest object.
   */
  build(): AZRequest {
    const subject = this.azSubjectBuilder.build();
    const resource = this.azResourceBuilder.build();
    const action = this.azActionBuilder.build();
    const context = this.azContextBuilder.build();

    this.azRequestBuilder
      .withPrincipal(this.principal)
      .withRequestID(this.requestID)
      .withSubject(subject)
      .withResource(resource)
      .withAction(action)
      .withContext(context);

    return this.azRequestBuilder.build();
  }
}
