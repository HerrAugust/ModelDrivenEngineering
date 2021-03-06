/**
 */
package webApplication.content;

import org.eclipse.emf.common.util.EList;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>CRUD Form</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link webApplication.content.CRUDForm#getFields <em>Fields</em>}</li>
 * </ul>
 *
 * @see webApplication.content.ContentPackage#getCRUDForm()
 * @model
 * @generated
 */
public interface CRUDForm extends Form {
	/**
	 * Returns the value of the '<em><b>Fields</b></em>' containment reference list.
	 * The list contents are of type {@link webApplication.content.Field}.
	 * <!-- begin-user-doc -->
	 * <p>
	 * If the meaning of the '<em>Fields</em>' containment reference list isn't clear,
	 * there really should be more of a description here...
	 * </p>
	 * <!-- end-user-doc -->
	 * @return the value of the '<em>Fields</em>' containment reference list.
	 * @see webApplication.content.ContentPackage#getCRUDForm_Fields()
	 * @model containment="true"
	 * @generated
	 */
	EList<Field> getFields();

} // CRUDForm
