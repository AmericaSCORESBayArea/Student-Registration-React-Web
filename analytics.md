## Analytics Provides Insight into User Experience as well as System Stability

### General Goals:
- Understand _who_ is using the app
- Understand their _Intentions_
- Understand what they see and what actions they take
- Track their completions
- Understand when they stop before completing a goal and why
- Measure overall usage by User Type, Demographic, Accessibility Needs, Language, etc.
- Measure the impact of changes to the UI/UX

  ### Technical Requirements
Analytics are implemented in Google Analytics GA4 via the Firebase SDK. Custom events and properties are required in some cases. In others, standard, off-the-shelf instrumentation is sufficient.

  ### Events, Features, Metrics
  The following is a list of events that the User would experience or system events that are consequential to stability at the Client App
  | Client/App                             | Page/View            | Feaure         | Event          | Properties  |
|----------------------------------------|----------------------|----------------|----------------|-------------|
| Student Registration React_Web_Desktop |                      |                |                |             |
|                                        | SiteSelector-Desktop | RegionSelector | RegionSelected | Region Name |
| Student Registration React_Web_Mobile  |                      |                |                |             |
|                                        | SiteSelector-Mobile  | RegionSelector | RegionSelected | Region Name |
|                                        |                      |                |                |             |
|----------------------------------------|----------------------|----------------|----------------|-------------|
