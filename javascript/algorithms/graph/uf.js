import dsalgo from '../../utilities';
/**
 * http://en.wikipedia.org/wiki/Disjoint-set_data_structure
 * http://algs4.cs.princeton.edu/15uf/
 *
 * Union–find data type also known as the disjoint-sets data type
 *
 * The union–find data type models connectivity among a set of n sites, named 0 through n–1.
 *
 * The is-connected-to relation must be an equivalence relation:
 *
 *  - Reflexive: p is connected to p.
 *  - Symmetric: If p is connected to q, then q is connected to p.
 *  - Transitive: If p is connected to q and q is connected to r, then p is connected to r.
 *
 * An equivalence relation partitions the sites into equivalence classes (or components).
 *
 * In this case, two sites are in the same component if and only if they are connected.
 * Both sites and components are identified with integers between 0 and n–1. Initially, there are n components,
 * with each site in its own component.
 *
 *
 * The component identifier of a component (also known as the root, canonical element, leader, or set representative)
 * is one of the sites in the component: two sites have the same component identifier if and only if they are in the same component.
 *
 * UF aka UnionFind
 *
 * @module UF
 */

/**
 * Supports the union and find operations,
 * along with a connected operation for determining whether two sites are in the same component
 *
 * and a count operation that returns the total number of components.
 *
 * inspired by: http://algs4.cs.princeton.edu/15uf/QuickFindUF.java.html
 *
 * This implementation maintains the invariant that p and q are connected if and only if id[p] is equal to id[q].
 *
 * In other words, all sites in a component must have the same value in id[]
 *
 * @class QuickFindUF
 */
class QuickFindUF {
  constructor({
    N,
    connections,
  }) {
    if (!dsalgo.utils.isDefined(N) && !dsalgo.utils.isDefined(connections)) {
      throw new Error('need number of sites or a connections string to properly initalize component_id array');
    }

    // component_id === id from sedgewick and wayne implementation
    this.component_id = [];
    // the number of components
    this.count = 0;

    if (N) this.initalizeComponentArray(N);

    if (connections) this.addFromText(connections);
  }

  /**
   * Initialize empty UF data structure with N isolated components
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * @param {any} N number of possible sites in the structure
   * @memberof QuickFindUF
   */
  initalizeComponentArray(N) {
    for (let i = 0; i < N; i += 1) this.component_id[i] = i;
    this.count = N;
  }

  /**
   * Checks to make sure that an input vertex/site is valid in the nunmber of sites
   *
   * Time Complexity: O(1)
   *
   * @param {any} p name of a site/vertex
   * @memberof QuickFindUF
   */
  validate(p) {
    const numSites = this.component_id.length;
    if (p < 0 || p >= numSites) {
      throw new Error(`site ${p} is not a valid site. as it is not in the number of sites: 0 to ${numSites - 1}`);
    }
  }

  /**
   * Returns the component identifier of the component containing p
   *
   * In this implementation find is constant... thus quick... thus quick find!
   *
   * Time Complexity: O(1)
   *
   * @param {any} p name of a site/vertex
   * @returns {number} component input site belongs to
   * @memberof QuickFindUF
   */
  find(p) {
    // returns the id for the component contanining site p
    this.validate(p);
    return this.component_id[p];
  }


  /**
   * returns true if both p and q are in the same component, and false otherwise
   *
   * Time Complexity: O(1)
   *
   * @param {any} p first site
   * @param {any} q second site
   * @returns {boolean} are they connected?
   * @memberof QuickFindUF
   */
  connected(p, q) {
    this.validate(p);
    this.validate(q);
    return this.component_id[p] === this.component_id[q];
  }

  /**
   * Adds a connection between the two sites p and q. If p and q are in different components,
   * then it replaces these two components with a new component that is the union of the two.
   *
   * In this implementation union is rather slow though on the order of the number of sites/verticies
   *
   * Unless p and q are already connected
   *
   * We need to check each site that p is connected to and each site q is connected to and make them the same
   *
   * their new same id is the same one as q's in the input.
   *
   * Time Complexity: O(n)
   *
   * @param {any} p first site
   * @param {any} q second site
   * @memberof QuickFindUF
   */
  union(p, q) {
    this.validate(p);
    this.validate(q);

    if (this.connected(p, q)) return;
    const pid = this.component_id[p];

    for (let i = 0; i < this.component_id.length; i += 1) {
      if (this.component_id[i] === pid) {
        this.component_id[i] = this.component_id[q];
      }
    }

    this.count -= 1;
  }
}

/**
 *
 * http://algs4.cs.princeton.edu/15uf/images/quick-union-overview.png
 * https://www.youtube.com/watch?v=Il3Ro8yGENE
 *
 * Note:
 *
 * this data structure / algorithm sucks it could devolve both find and union into O(n) very quickly for densely connected components if a connection tree gets large
 * probably useful to keep a seperate data structure with the roots of trees so you can access those in constant time
 *
 * but useful for the academic purpose of learning how it is optimized into the the fastest form of UF
 *
 * @class QuickUnionUF
 */
class QuickUnionUF {
  constructor({
    N,
    connections,
  }) {
    if (!dsalgo.utils.isDefined(N) && !dsalgo.utils.isDefined(connections)) {
      throw new Error('need number of sites or a connections string to properly initalize component_id array');
    }

    this.parent = [];

    // size is not used in base quick union but is needed in all other forms
    //
    // since you cannot access `this` before a super call in an es6 subclass
    // which would allow the size property to be set there
    //
    // the best compromise I could come up with in terms of least hacky,
    // easiest to understand, least code duplication, lots of stuff...
    //
    // was to move the setting of the property up to this constructor
    this.size = [];

    if (N) this.initalizeComponentArray(N);
    if (connections) this.addFromText(connections);
  }

  /**
   * Initialize empty UF data structure with N isolated components
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * @param {any} N total number of sites
   * @memberof QuickUnionUF
   */
  initalizeComponentArray(N) {
    for (let i = 0; i < N; i += 1) this.parent[i] = i;
    this.count = N;
  }

  /**
   * Checks to make sure that an input vertex/site is valid in the nunmber of sites
   *
   * Time Complexity: O(1)
   *
   * @param {any} p name of a site/vertex
   * @memberof QuickUnionUF
   */
  validate(p) {
    const numSites = this.parent.length;
    if (p < 0 || p >= numSites) {
      throw new Error(`site ${p} is not a valid site. as it is in the number of sites from 0 to ${numSites - 1}`);
    }
  }

  /**
   * Returns the id for the component contanining site p
   *
   * In this implementation of find() we start at the given site, follow its link to another site (its parent)
   *
   * and so on until we find a site that links to itself.
   *
   * This is called a root and it is the name of the component to which the input site belongs
   *
   * Worst Case Time Complexity: O(n)
   *
   * this function could quickly devolve into in O(n) in a dense graph with many connections though it is really
   *
   * O(height of the tree form by the path structure)
   *
   * @param {any} inputP name of a site/vertex
   * @returns {number} component input site belongs to
   * @memberof QuickUnionUF
   */
  find(inputP) {
    this.validate(inputP);

    let p = inputP;
    while (p !== this.parent[p]) {
      p = this.parent[p];
    }

    return p;
  }

  /**
   * A 2 sites are connected in this implementation if they share the same root
   *
   * @param {any} p first site
   * @param {any} q second site
   * @returns {boolean} are they connected?
   * @memberof QuickUnionUF
   */
  connected(p, q) {
    return this.find(p) === this.find(q);
  }

  /**
   * To unite 2 sites we simply need to find their roots and overwrite one with the other
   *
   * @param {any} p first site
   * @param {any} q second site
   * @memberof QuickUnionUF
   */
  union(p, q) {
    const rootP = this.find(p);
    const rootQ = this.find(q);

    if (rootP === rootQ) return;

    this.parent[rootP] = rootQ;

    this.count = this.count - 1;
  }
}

/**
 * In this UF implementation rather than arbitrarily connecting the second tree
 * to the first for union() in the quick-union algorithm, we keep track of the size of each tree
 *
 * and always connect the smaller tree to the larger.
 *
 * @class WeightedQuickUnionUF
 * @extends {QuickUnionUF}
 */
class WeightedQuickUnionUF extends QuickUnionUF {
  /**
   * Updates `super.initalizeComponentArray` to also init the tree size array
   *
   * @param {any} N number of possible sites
   * @memberof WeightedQuickUnionUF
   */
  initalizeComponentArray(N) {
    for (let i = 0; i < N; i += 1) {
      this.parent[i] = i;
      this.size[i] = i;
    }
    this.count = N;
  }

  /**
   * Simply finds the roots of the tree's p and q belong to
   *
   * and replaces the root of the small with the taller
   *
   * https://www.youtube.com/watch?v=R45MPl59MC0
   *
   * @param {any} p first site
   * @param {any} q second site
   * @memberof WeightedQuickUnionUF
   */
  union(p, q) {
    const rootP = this.find(p);
    const rootQ = this.find(q);

    if (rootP === rootQ) return;

    if (this.size[rootP] < this.size[rootQ]) {
      this.parent[rootP] = rootQ;
      this.size[rootQ] = this.size[rootQ] + this.size[rootP];
    } else {
      this.parent[rootQ] = rootP;
      this.size[rootP] = this.size[rootP] + this.size[rootQ];
    }

    this.count = this.count - 1;
  }
}


/**
 * Implements path compression in the find
 *
 * @class WeightedQuickUnionPathCompressionUF
 * @extends {WeightedQuickUnionUF}
 */
class WeightedQuickUnionPathCompressionUF extends WeightedQuickUnionUF {
  /**
   * This implementation of find adds path compression,
   *
   * by adding a loop to find() that links every sie on the path from p to the root.
   *
   * @param {any} inputP name of a site/vertex
   * @returns {number} component input site belongs to
   * @memberof WeightedQuickUnionPathCompressionUF
   */
  find(inputP) {
    this.validate(inputP);
    // look for root start at the site we are given
    let p = inputP;

    let root = p;
    while (root !== this.parent[root]) {
      root = this.parent[root];
    }

    // take all the other nodes along the path and connect them to the root of the tree
    while (p !== root) {
      const nextP = this.parent[p];
      this.parent[p] = root;
      p = nextP;
    }

    return root;
  }
}

/**
 * Implements path compaction by halving in the find
 *
 * @class WeightedQuickUnionPathHalvingUF
 * @extends {WeightedQuickUnionUF}
 */
class WeightedQuickUnionPathHalvingUF extends WeightedQuickUnionUF {
  /**
   * This version makes each node in the tree point to its grandparent
   *
   * Along the way to finding the root of the tree
   *
   * @param {any} inputP name of a site/vertex
   * @returns {number} component input site belongs to
   * @memberof WeightedQuickUnionPathHalvingUF
   */
  find(inputP) {
    this.validate(inputP);
    let p = inputP;

    while (p !== this.parent[p]) {
      this.parent[p] = this.parent[this.parent[p]];
      p = this.parent[p];
    }

    return p;
  }
}

/**
 * Builds a connected component using a particular UF from a txt file
 *
 * i.e. http://algs4.cs.princeton.edu/15uf/tinyUF.txt
 *
 * @param {any} txt text to build site list and components from
 */
function addSiteFromText(txt) {
  const context = this;
  const restOfList = txt.trim().split('\n');

  const numSites = restOfList.shift();

  this.initalizeComponentArray(numSites);

  restOfList.forEach((line) => {
    const info = line.split(' ');
    const p = dsalgo.utils.makeNumberUnlessNaN(info[0]);
    const q = dsalgo.utils.makeNumberUnlessNaN(info[1]);

    if (context.connected(p, q)) return; // return === continue in a js forEach

    context.union(p, q);
  });
}

QuickFindUF.prototype.addFromText = addSiteFromText;
QuickUnionUF.prototype.addFromText = addSiteFromText;

export default {
  quick_find: QuickFindUF,
  quick_union: QuickUnionUF,
  weighted_quick_union: WeightedQuickUnionUF,
  weighted_quick_union_with_path_compression: WeightedQuickUnionPathCompressionUF,
  weighted_quick_union_with_path_halving: WeightedQuickUnionPathHalvingUF,
};
