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

package common

import "testing"

// TestValidateID_PathTraversal guards against the "inert fix" trap: the pinned
// spec v0.1.2 ValidateID regex allows '.', so "..", "." and leading/trailing
// dots would otherwise pass. These MUST be rejected for the path-traversal
// security fixes to be effective.
func TestValidateID_PathTraversal(t *testing.T) {
	rejected := []string{
		"..",
		".",
		"...",
		"../secret",
		"foo..bar",
		".hidden",
		"trailing.",
	}
	for _, name := range rejected {
		if err := ValidateID(name); err == nil {
			t.Errorf("ValidateID(%q) = nil, want error (path-traversal vector must be rejected)", name)
		}
	}
}

// TestValidateID_ValidNames ensures the hardening does not produce false
// positives on legitimate names that contain single dots.
func TestValidateID_ValidNames(t *testing.T) {
	accepted := []string{
		"my-dashboard",
		"my_dashboard",
		"my.dashboard",
		"node.js",
		"v1.2.3",
		"a.b.c",
	}
	for _, name := range accepted {
		if err := ValidateID(name); err != nil {
			t.Errorf("ValidateID(%q) = %v, want nil", name, err)
		}
	}
}
