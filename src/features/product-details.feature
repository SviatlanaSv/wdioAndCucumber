Feature: Product details
  User can review a product’s information.

  Scenario: User views product details with all key information
    Given the user is browsing products
    When the user opens the details for the product "Pliers"
    Then the product details view is displayed
    And the product shows an image
    And the product shows a description
    And the product shows a price
