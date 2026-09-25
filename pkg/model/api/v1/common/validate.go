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

import (
	"fmt"
	"strings"

	"github.com/perses/spec/go/common"
)

// ValidateID checks for forbidden items in substring used inside id.
//
// It delegates to github.com/perses/spec/go/common.ValidateID and then adds
// the path-traversal hardening that the pinned spec version (v0.1.2) does not
// yet enforce: the "should not contain '..'" and "should not start or end with
// '.'" checks. This mirrors the validation added in later spec releases and is
// relied upon by the security fixes protecting file/DB paths against traversal.
func ValidateID(name string) error {
	if err := common.ValidateID(name); err != nil {
		return err
	}
	if strings.Contains(name, "..") {
		return fmt.Errorf("%q is not a correct name. It should not contain '..'", name)
	}
	if strings.HasPrefix(name, ".") || strings.HasSuffix(name, ".") {
		return fmt.Errorf("%q is not a correct name. It should not start or end with '.'", name)
	}
	return nil
}

// ValidateDescription checks for forbidden items in substring used inside description
// DEPRECATED: this is replaced by the struct github.com/perses/spec/go/common.ValidateDescription
func ValidateDescription(description string) error {
	return common.ValidateDescription(description)
}
