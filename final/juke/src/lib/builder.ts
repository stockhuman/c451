import { SUBTRACTION, Brush, Evaluator } from 'three-bvh-csg'
import { BoxGeometry } from 'three/src/geometries/BoxGeometry.js'
import { SphereGeometry } from 'three/src/geometries/SphereGeometry.js'

type RecordSide = {

} | null


/**
 * Builds A record given 
 */
export function builder (sideA: RecordSide = null, sideB: RecordSide = null) {
  const brush1 = new Brush(new SphereGeometry())
  brush1.updateMatrixWorld()
  
  const brush2 = new Brush(new BoxGeometry())
  brush2.position.y = 0.5
  brush2.updateMatrixWorld()
  
  const evaluator = new Evaluator()
  const result = evaluator.evaluate(brush1, brush2, SUBTRACTION)
  return result.geometry
}


