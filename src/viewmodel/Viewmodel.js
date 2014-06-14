import create from 'utils/create';
import adapt from 'viewmodel/prototype/adapt';
import capture from 'viewmodel/prototype/capture';
import clearCache from 'viewmodel/prototype/clearCache';
import get from 'viewmodel/prototype/get';
import register from 'viewmodel/prototype/register';
import release from 'viewmodel/prototype/release';
import set from 'viewmodel/prototype/set';
import teardown from 'viewmodel/prototype/teardown';
import unregister from 'viewmodel/prototype/unregister';
import createComputations from 'viewmodel/Computation/createComputations';

var Viewmodel = function ( ractive ) {
	this.ractive = ractive; // TODO eventually, we shouldn't need this reference

	this.cache = {}; // we need to be able to use hasOwnProperty, so can't inherit from null
	this.cacheMap = create( null );

	this.deps = [];
	this.depsMap = create( null );

	this.wrapped = create( null );

	// TODO these are conceptually very similar. Can they be merged somehow?
	this.evaluators = create( null );
	this.computations = create( null );

	this.captured = null;
	this.unresolvedImplicitDependencies = [];

	this.changes = [];
};

Viewmodel.prototype = {
	adapt: adapt,
	capture: capture,
	clearCache: clearCache,
	get: get,
	register: register,
	release: release,
	set: set,
	teardown: teardown,
	unregister: unregister,
	// createComputations, in the computations, may call back through get or set
	// of ractive. So, for now, we delay creation of computed from constructor.
	// on option would be to have the Computed class be lazy about using .update()
	compute: function () {
		createComputations( this.ractive, this.ractive.computed );
	}
};

export default Viewmodel;
