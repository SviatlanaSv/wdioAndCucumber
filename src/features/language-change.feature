Feature: Language change

  Scenario Outline: User switches the website language among supported options
    Given multiple site languages are available
    And the user is viewing the site in a "<language>"
    When the user switches the site language to different "<language>"
    Then website content appears in chosen "<language>"
    And the selected language persists when the user navigates to a product details page

  Examples:
    | language |
    | DE       |
    | EN       |
    | ES       |
    | FR       |
    | NL       |
    | TR       |
