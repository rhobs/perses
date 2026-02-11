// Copyright The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package k8s

import (
	v1Role "github.com/rhobs/perses/pkg/model/api/v1/role"
)

type k8sAction string

const (
	k8sReadAction     k8sAction = "get"
	k8sCreateAction   k8sAction = "create"
	k8sUpdateAction   k8sAction = "patch"
	k8sDeleteAction   k8sAction = "delete"
	k8sWildcardAction k8sAction = "*"
)

type k8sScope string

const (
	k8sWildcardScope         k8sScope = "*"
	k8sDashboardScope        k8sScope = "persesdashboards"
	k8sGlobalDatasourceScope k8sScope = "persesglobaldatasources"
	k8sDatasourceScope       k8sScope = "persesdatasources"
	k8sProjectScope          k8sScope = "namespaces"
)

// globalScopesToCheck contains all scopes that should be checked at the wildcard (all-namespace)
// level when computing permissions. This includes both global-only scopes and project-scoped
// resources that benefit from an initial wildcard check to avoid redundant per-namespace checks.
var globalScopesToCheck = []v1Role.Scope{
	v1Role.GlobalDatasourceScope,
	v1Role.GlobalVariableScope,
	v1Role.GlobalSecretScope,
	v1Role.GlobalRoleScope,
	v1Role.GlobalRoleBindingScope,
	v1Role.UserScope,
	v1Role.DashboardScope,
	v1Role.DatasourceScope,
	v1Role.VariableScope,
	v1Role.SecretScope,
	v1Role.RoleScope,
	v1Role.RoleBindingScope,
	v1Role.EphemeralDashboardScope,
	v1Role.FolderScope,
}

// projectScopesToCheck contains all project-scoped resources that should be checked per-namespace
// when computing permissions.
var projectScopesToCheck = []v1Role.Scope{
	v1Role.DashboardScope,
	v1Role.DatasourceScope,
	v1Role.VariableScope,
	v1Role.SecretScope,
	v1Role.RoleScope,
	v1Role.RoleBindingScope,
	v1Role.EphemeralDashboardScope,
	v1Role.FolderScope,
}

// globalScopes contains all resources which are global-scoped (not namespaced).
// When checking permissions for these scopes, the namespace is forced to WildcardProject.
var globalScopes = []v1Role.Scope{
	v1Role.GlobalDatasourceScope,
	v1Role.GlobalVariableScope,
	v1Role.GlobalSecretScope,
	v1Role.GlobalRoleScope,
	v1Role.GlobalRoleBindingScope,
	v1Role.UserScope,
}

func getK8sAction(action v1Role.Action) k8sAction {
	switch action {
	case v1Role.ReadAction:
		return k8sReadAction
	case v1Role.CreateAction:
		return k8sCreateAction
	case v1Role.UpdateAction:
		return k8sUpdateAction
	case v1Role.DeleteAction:
		return k8sDeleteAction
	case v1Role.WildcardAction:
		return k8sWildcardAction
	default: // not reachable
		return ""
	}
}

// getK8sScope translates a Perses scope to its corresponding Kubernetes resource name.
// Returns an empty string if the scope has no direct K8s CRD equivalent. In that case,
// checkSpecificPermission falls back to checking the project/namespace permission instead.
func getK8sScope(scope v1Role.Scope) k8sScope {
	switch scope {
	case v1Role.DashboardScope:
		return k8sDashboardScope
	case v1Role.GlobalDatasourceScope:
		return k8sGlobalDatasourceScope
	case v1Role.DatasourceScope:
		return k8sDatasourceScope
	case v1Role.ProjectScope:
		return k8sProjectScope
	case v1Role.WildcardScope:
		return k8sWildcardScope
	default:
		return "" // Scope doesn't have a k8s equivalent; callers should fall back to project scope
	}
}
