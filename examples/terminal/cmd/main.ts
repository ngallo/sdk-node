// Copyright 2024 Nitro Agility S.r.l.
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

import { AZClient } from "../../../azclient";
import {
  AZRequest,
  AZResponse,
  PrincipalBuilder,
  AZAtomicRequestBuilder,
  SubjectBuilder,
  ResourceBuilder,
  ActionBuilder,
  ContextBuilder,
  EvaluationBuilder,
  AZRequestBuilder,
} from "../../../az/azreq/index";

// Load JSON file (embedded in Go, but in TypeScript, we can use `import` or `fs`)
import json_ok_onlyone from "./requests/ok_onlyone1.json";
import { withEndpoint } from "../../../azconfig";

/**
 * Checks a JSON request.
 */
async function checkJsonRequest(): Promise<void> {
  // Create a new Permguard client
  const azClient = new AZClient(withEndpoint("localhost", 9094));

  // Check the authorization
  const { decision, response } = await azClient.check(json_ok_onlyone);
  if (decision) {
    console.log("✅ Authorization Permitted");
  } else {
    console.log("❌ Authorization Denied");
    if (response) {
      if (response.Context?.ReasonAdmin) {
        console.log(`-> Reason Admin: ${response.Context.ReasonAdmin.Message}`);
      }
      if (response.Context?.ReasonUser) {
        console.log(`-> Reason User: ${response.Context.ReasonUser.Message}`);
      }
      for (const evaluation of response.Evaluations || []) {
        if (evaluation.Context?.ReasonAdmin) {
          console.log(
            `-> Reason Admin: ${evaluation.Context.ReasonAdmin.Message}`
          );
        }
        if (evaluation.Context?.ReasonUser) {
          console.log(
            `-> Reason User: ${evaluation.Context.ReasonUser.Message}`
          );
        }
      }
    }
  }
}

/**
 * Checks an atomic evaluation.
 */
async function checkAtomicEvaluation(): Promise<void> {
  // Create a new Permguard client
  const azClient = new AZClient(withEndpoint("localhost", 9094));

  // Create the Principal
  const principal = new PrincipalBuilder("amy.smith@acmecorp.com").build();

  // Create the entities
  const entities = [
    {
      uid: {
        type: "MagicFarmacia::Platform::BranchInfo",
        id: "subscription",
      },
      attrs: {
        active: true,
      },
      parents: [],
    },
  ];

  // Create a new authorization request
  const req = new AZAtomicRequestBuilder(
    583438038653,
    "46706cb00ea248d6841cfe2c9f02205b",
    "amy.smith@acmecorp.com",
    "MagicFarmacia::Platform::Subscription",
    "MagicFarmacia::Platform::Action::view"
  )
    .withRequestID("1234")
    .withPrincipal(principal)
    .withEntitiesItems("cedar", entities)
    .withSubjectKind("user")
    .withSubjectSource("keycloack")
    .withSubjectProperty("isSuperUser", true)
    .withResourceID("e3a786fd07e24bfa95ba4341d3695ae8")
    .withResourceProperty("isEnabled", true)
    .withActionProperty("isEnabled", true)
    .withContextProperty("time", "2025-01-23T16:17:46+00:00")
    .withContextProperty("isSubscriptionActive", true)
    .build();

  // Check the authorization
  const { decision, response } = await azClient.check(req);
  if (decision) {
    console.log("✅ Authorization Permitted");
  } else {
    console.log("❌ Authorization Denied");
    if (response) {
      if (response.Context?.ReasonAdmin) {
        console.log(`-> Reason Admin: ${response.Context.ReasonAdmin.Message}`);
      }
      if (response.Context?.ReasonUser) {
        console.log(`-> Reason User: ${response.Context.ReasonUser.Message}`);
      }
      for (const evaluation of response.Evaluations || []) {
        if (evaluation.Context?.ReasonAdmin) {
          console.log(
            `-> Reason Admin: ${evaluation.Context.ReasonAdmin.Message}`
          );
        }
        if (evaluation.Context?.ReasonUser) {
          console.log(
            `-> Reason User: ${evaluation.Context.ReasonUser.Message}`
          );
        }
      }
    }
  }
}

/**
 * Checks multiple evaluations.
 */
async function checkMultipleEvaluations(): Promise<void> {
  // Create a new Permguard client
  const azClient = new AZClient(withEndpoint("localhost", 9094));

  // Create a new subject
  const subject = new SubjectBuilder("amy.smith@acmecorp.com")
    .withKind("user")
    .withSource("keycloack")
    .withProperty("isSuperUser", true)
    .build();

  // Create a new resource
  const resource = new ResourceBuilder("MagicFarmacia::Platform::Subscription")
    .withID("e3a786fd07e24bfa95ba4341d3695ae8")
    .withProperty("isEnabled", true)
    .build();

  // Create actions
  const actionView = new ActionBuilder("MagicFarmacia::Platform::Action::view")
    .withProperty("isEnabled", true)
    .build();

  const actionCreate = new ActionBuilder(
    "MagicFarmacia::Platform::Action::create"
  )
    .withProperty("isEnabled", true)
    .build();

  // Create a new Context
  const context = new ContextBuilder()
    .withProperty("time", "2025-01-23T16:17:46+00:00")
    .withProperty("isSubscriptionActive", true)
    .build();

  // Create evaluations
  const evaluationView = new EvaluationBuilder(subject, resource, actionView)
    .withRequestID("1234")
    .withContext(context)
    .build();

  const evaluationCreate = new EvaluationBuilder(
    subject,
    resource,
    actionCreate
  )
    .withRequestID("7890")
    .withContext(context)
    .build();

  // Create the Principal
  const principal = new PrincipalBuilder("amy.smith@acmecorp.com").build();

  // Create the entities
  const entities = [
    {
      uid: {
        type: "MagicFarmacia::Platform::BranchInfo",
        id: "subscription",
      },
      attrs: {
        active: true,
      },
      parents: [],
    },
  ];

  // Create a new authorization request
  const req = new AZRequestBuilder(
    583438038653,
    "46706cb00ea248d6841cfe2c9f02205b"
  )
    .withPrincipal(principal)
    .withEntitiesItems("cedar", entities)
    .withEvaluation(evaluationView)
    .withEvaluation(evaluationCreate)
    .build();

  // Check the authorization
  const { decision, response } = await azClient.check(req);
  if (decision) {
    console.log("✅ Authorization Permitted");
  } else {
    console.log("❌ Authorization Denied");
    if (response) {
      if (response.Context?.ReasonAdmin) {
        console.log(`-> Reason Admin: ${response.Context.ReasonAdmin.Message}`);
      }
      if (response.Context?.ReasonUser) {
        console.log(`-> Reason User: ${response.Context.ReasonUser.Message}`);
      }
      for (const evaluation of response.Evaluations || []) {
        if (evaluation.Context?.ReasonAdmin) {
          console.log(
            `-> Reason Admin: ${evaluation.Context.ReasonAdmin.Message}`
          );
        }
        if (evaluation.Context?.ReasonUser) {
          console.log(
            `-> Reason User: ${evaluation.Context.ReasonUser.Message}`
          );
        }
      }
    }
  }
}

/**
 * Main function.
 */
async function main() {
  await checkJsonRequest();
  await checkAtomicEvaluation();
  // await checkMultipleEvaluations();
}

main();
